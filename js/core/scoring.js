// scoring.js —— 评分引擎（15 维扁平版，纯函数，浏览器与 Node 均可 import）
// 输入：answers = { 题目id: 选项key }；questions 题库。
// 输出：结构化报告。所有展示分均为「本测试内部相对倾向」，非真实人格概率。

import { DIM_KEYS } from './keys.js';
import { NEEDS, NEED_SOURCES } from '../data/dimensions.js';

// —— 配置阈值 ——
const TOP_MIN_EVIDENCE = 3;   // 突出维最低证据：被 ≥3 道已答题触及才可入选
const TOP_N = 5;              // 最多展示的突出维数
const TOP_MIN = 3;           // 至少展示的突出维数
const CONTRAST_GAP = 20;      // 反差：自评分与实际分差距 ≥ 此值（0-100）才成立
const LOW_CONF_RATIO = 0.6;   // 已答占比低于此值 → 低确定性

function emptyAcc() {
  const o = {};
  for (const k of DIM_KEYS) o[k] = { raw: 0, max: 0, min: 0, evidence: 0 };
  return o;
}

/**
 * 累加：遍历已答题，把选中选项的 dims 分值累加到对应维度；
 * 同时累加每题在该维度上的理论最高/最低分，用于归一化（支持反向计分）。
 */
function accumulate(answers, questions) {
  const acc = emptyAcc();
  const consistency = {}; // group -> { self, actual, dim, selfText, actualText }
  let answeredCount = 0;

  for (const q of questions) {
    const chosenKey = answers[q.id];
    if (chosenKey == null) continue;              // 漏答整题跳过，不计入 max/min
    const chosen = q.options.find((o) => o.key === chosenKey);
    if (!chosen || chosen.skip) continue;         // 不适用/未发生 不计分
    answeredCount++;
    const w = q.weight ?? 1;

    for (const key of DIM_KEYS) {
      const vals = q.options.filter((o) => !o.skip).map((o) => (o.scores?.[key] ?? 0) * w);
      if (!vals.some((v) => v !== 0)) continue;    // 该题在此维无信号则跳过
      acc[key].max += Math.max(...vals, 0);
      acc[key].min += Math.min(...vals, 0);
      acc[key].raw += (chosen.scores?.[key] ?? 0) * w;
      acc[key].evidence += 1;
    }

    // 反差对照题（同一维度配对 self / actual）
    if (q.consistencyGroup && q.compareDim) {
      const dim = q.compareDim;
      const g = (consistency[q.consistencyGroup] ??= { self: null, actual: null, dim });
      const vals = q.options.filter((o) => !o.skip).map((o) => o.scores?.[dim] ?? 0);
      const mx = Math.max(...vals, 0), mn = Math.min(...vals, 0);
      const got = chosen.scores?.[dim] ?? 0;
      const norm = mx === mn ? 50 : ((got - mn) / (mx - mn)) * 100;
      if (q.contrastSelf) g.selfText = q.contrastSelf;
      if (q.contrastActual) g.actualText = q.contrastActual;
      if (q.compareRole === 'self') g.self = norm;
      else if (q.compareRole === 'actual') g.actual = norm;
    }
  }
  return { acc, consistency, answeredCount };
}

// 归一化为 0-100
function normalize(acc) {
  const out = {};
  for (const [k, v] of Object.entries(acc)) {
    const range = v.max - v.min;
    out[k] = { score: range === 0 ? 0 : Math.round(((v.raw - v.min) / range) * 100), evidence: v.evidence };
  }
  return out;
}

// 隐藏需求排序
function computeNeeds(norm) {
  const result = [];
  for (const [key, sources] of Object.entries(NEED_SOURCES)) {
    let val = 0, wsum = 0;
    for (const s of sources) { val += (norm[s.dim]?.score ?? 0) * s.w; wsum += s.w; }
    result.push({ key, name: NEEDS[key].name, desc: NEEDS[key].desc, score: Math.round(val / (wsum || 1)) });
  }
  return result.sort((a, b) => b.score - a.score);
}

/**
 * 主评分入口。
 */
export function scoreTest(answers, questions) {
  const { acc, consistency, answeredCount } = accumulate(answers, questions);
  const norm = normalize(acc);

  // 降序排行
  const dimRank = DIM_KEYS
    .map((k) => ({ key: k, score: norm[k].score, evidence: norm[k].evidence }))
    .sort((a, b) => b.score - a.score);

  // 占比（雷达图之外的相对比例，注明非科学概率）
  const total = dimRank.reduce((s, d) => s + d.score, 0);
  const proportions = {};
  for (const d of dimRank) proportions[d.key] = total === 0 ? 0 : Math.round((d.score / total) * 100);

  // 突出维：Top，先过滤低证据
  const qualified = dimRank.filter((d) => d.evidence >= TOP_MIN_EVIDENCE && d.score > 0);
  let topDims = qualified.slice(0, TOP_N);
  if (topDims.length < TOP_MIN) topDims = dimRank.filter((d) => d.score > 0).slice(0, TOP_MIN);

  // 反差
  const contrasts = [];
  for (const [group, g] of Object.entries(consistency)) {
    if (g.self != null && g.actual != null && g.selfText && g.actualText &&
        Math.abs(g.self - g.actual) >= CONTRAST_GAP) {
      contrasts.push({ group, dim: g.dim, think: g.selfText, actual: g.actualText, gap: Math.round(Math.abs(g.self - g.actual)) });
    }
  }

  return {
    answeredCount,
    totalQuestions: questions.length,
    lowConfidence: answeredCount < Math.ceil(questions.length * LOW_CONF_RATIO),
    dims: norm,
    dimRank,
    proportions,
    mainDimKey: dimRank[0]?.key,
    topDims,
    needs: computeNeeds(norm),
    contrasts,
  };
}

export const SCORING_CONFIG = { TOP_MIN_EVIDENCE, TOP_N, TOP_MIN, CONTRAST_GAP, LOW_CONF_RATIO };
