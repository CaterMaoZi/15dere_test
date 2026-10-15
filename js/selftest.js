// selftest.js —— 六画像自测（15 维体系；Node 与浏览器 console 均可运行）
// Node:   node js/selftest.js
import { QUESTIONS } from './data/questions.js';
import { scoreTest } from './core/scoring.js';
import { DIM_NAMES } from './core/keys.js';

// 画像：对希望拉高的维度给权重，自动挑最贴合选项
const PERSONAS = {
  P1_真诚稳定: { desc: '真诚自然、愿意主动表达、重视稳定', pref: { natural: 3, zhongli: 2 } },
  P2_新鲜自由: { desc: '喜欢新鲜感、擅长互动、重视自由', pref: { qingfu: 3, fuli: 3 } },
  P3_精神共鸣: { desc: '重视精神共鸣、深入交流、独特', pref: { dianbo: 3, sanwu: 1 } },
  P4_地雷易爆: { desc: '情绪不稳定、随时引爆、关系波动大', pref: { dilei: 3, baojiao: 2 } },
  P5_重力沉重: { desc: '爱很重、向内承受、精神内耗', pref: { zhongli: 3, yujiao: 1 } },
  P6_表面独立: { desc: '表面独立理性、实际很在意（测反差）', pref: { fuli: 2, qingxing: 2 }, overrides: 'contrast' },
  P7_病娇占有: { desc: '向外占有、怕失去、归咎他人', pref: { bingjiao: 3 } },
  P8_郁娇自责: { desc: '向内自责、卑微讨好、低自我价值', pref: { yujiao: 3 } },
};

function optionFit(option, pref) {
  let fit = 0;
  for (const [k, w] of Object.entries(pref)) fit += (option.scores?.[k] || 0) * w;
  return fit;
}

function answerAs(persona) {
  const answers = {};
  for (const q of QUESTIONS) {
    const usable = q.options.filter((o) => !o.skip);
    if (!usable.length) continue;
    if (persona.overrides === 'contrast' && q.consistencyGroup && q.compareDim) {
      const dim = q.compareDim;
      const pickHigh = q.compareRole === 'self';
      let best = usable[0], bestVal = -Infinity;
      for (const o of usable) {
        const v = o.scores?.[dim] ?? 0;
        const score = pickHigh ? v : -v;
        if (score > bestVal) { bestVal = score; best = o; }
      }
      answers[q.id] = best.key;
      continue;
    }
    let best = usable[0], bestFit = -Infinity;
    for (const o of usable) { const f = optionFit(o, persona.pref); if (f > bestFit) { bestFit = f; best = o; } }
    answers[q.id] = best.key;
  }
  return answers;
}

export function runSelfTest(log = console.log) {
  const results = {};
  const failures = [];
  const pass = (cond, msg) => { if (!cond) failures.push(msg); };

  log('========== 六画像自测（15 维）==========');
  for (const [name, persona] of Object.entries(PERSONAS)) {
    const report = scoreTest(answerAs(persona), QUESTIONS);
    results[name] = report;
    log(`\n【${name}】${persona.desc}`);
    log(`  已答 ${report.answeredCount}/${report.totalQuestions} · 最突出: ${DIM_NAMES[report.mainDimKey]}`);
    log(`  Top5: ${report.dimRank.slice(0, 5).map((d) => DIM_NAMES[d.key] + d.score).join(' ')}`);
    if (report.contrasts.length) log(`  反差: ${report.contrasts.length} 项`);
  }

  log('\n========== 断言 ==========');
  const expect = { P1_真诚稳定: ['natural', 'zhongli'], P2_新鲜自由: ['qingfu', 'fuli'],
    P3_精神共鸣: ['dianbo'], P4_地雷易爆: ['dilei', 'baojiao'], P5_重力沉重: ['zhongli'],
    P7_病娇占有: ['bingjiao'], P8_郁娇自责: ['yujiao'] };
  for (const [name, exp] of Object.entries(expect)) {
    const got = results[name].mainDimKey;
    pass(exp.includes(got), `${name} 最突出维应∈[${exp}]，实际 ${got}`);
    log(`[${exp.includes(got) ? 'OK' : 'FAIL'}] ${name} 方向（${DIM_NAMES[got]}）`);
  }

  // 主维区分度
  const mains = new Set(Object.values(results).map((r) => r.mainDimKey));
  pass(mains.size >= 5, `主维区分度不足：${mains.size}`);
  log(`[${mains.size >= 5 ? 'OK' : 'FAIL'}] 主维区分度：${mains.size} 种`);

  // 地雷区分：易爆画像的地雷分应显著高于新鲜画像
  const dLei = results.P4_地雷易爆.dims.dilei.score;
  const dAiry = results.P2_新鲜自由.dims.dilei.score;
  pass(dLei > dAiry + 15, `地雷区分不足：易爆${dLei} vs 新鲜${dAiry}`);
  log(`[${dLei > dAiry + 15 ? 'OK' : 'FAIL'}] 地雷区分：易爆${dLei} vs 新鲜${dAiry}`);

  // 向内/向外区分：重力画像(向内)的 bingjiao 不应盖过 zhongli；病娇画像(向外)的 bingjiao 应显著高于重力画像
  const r5 = results.P5_重力沉重.dims, r7 = results.P7_病娇占有.dims;
  pass(r5.zhongli.score >= r5.bingjiao.score, `重力画像应 zhongli≥bingjiao（内≠外），实际 ${r5.zhongli.score} vs ${r5.bingjiao.score}`);
  log(`[${r5.zhongli.score >= r5.bingjiao.score ? 'OK' : 'FAIL'}] 重力向内：zhongli${r5.zhongli.score}≥bingjiao${r5.bingjiao.score}`);
  pass(r7.bingjiao.score > r5.bingjiao.score + 15, `病娇向外区分不足：病娇${r7.bingjiao.score} vs 重力${r5.bingjiao.score}`);
  log(`[${r7.bingjiao.score > r5.bingjiao.score + 15 ? 'OK' : 'FAIL'}] 病娇向外：病娇${r7.bingjiao.score} vs 重力${r5.bingjiao.score}`);

  // 郁娇(向内自责)应与地雷(向外爆雷)可区分：郁娇画像 yujiao 高于其 dilei
  const r8 = results.P8_郁娇自责.dims;
  pass(r8.yujiao.score > r8.dilei.score, `郁娇应 yujiao>dilei（内≠外），实际 ${r8.yujiao.score} vs ${r8.dilei.score}`);
  log(`[${r8.yujiao.score > r8.dilei.score ? 'OK' : 'FAIL'}] 郁娇向内：yujiao${r8.yujiao.score}>dilei${r8.dilei.score}`);

  // P6 反差
  const p6c = results.P6_表面独立.contrasts.length;
  pass(p6c >= 1, `P6 未识别反差（${p6c}）`);
  log(`[${p6c >= 1 ? 'OK' : 'FAIL'}] P6 反差识别：${p6c} 项`);

  log('\n========== 结果 ==========');
  if (failures.length === 0) log('✅ 全部通过');
  else { log(`❌ ${failures.length} 项失败：`); failures.forEach((f) => log('  - ' + f)); }
  return { results, failures };
}

if (typeof process !== 'undefined' && process.argv[1] && process.argv[1].endsWith('selftest.js')) {
  const { failures } = runSelfTest();
  process.exit(failures.length === 0 ? 0 : 1);
}
