// render.js —— 结果页各板块渲染（15 维体系）
import { DIMENSIONS, NEEDS } from '../data/dimensions.js';
import { DIM_KEYS, DIMS_META } from './keys.js';
import { ATTRACTION, getPairNote } from '../data/matching.js';
import { conflictStyle, growthAdvice } from '../data/results-copy.js';

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const colorOf = (k) => DIMS_META[k].color;

// —— 1. 主维卡片 ——
export function renderMainDim(report) {
  const key = report.mainDimKey;
  const d = DIMENSIONS[key];
  const color = colorOf(key);
  const score = report.dims[key].score;
  const top3 = report.topDims.slice(0, 3).map((t) => DIMS_META[t.key].name).join(' · ');
  return `
    <div class="card main-type-card">
      <div class="your-type">YOUR TYPE</div>
      <span class="type-badge" style="background:${color}">${esc(d.en)}</span>
      <h1 class="type-name-cn" style="color:${color}">${d.name}</h1>
      <div class="type-name-en">${esc(d.en)}</div>
      <div class="type-keywords">${d.keywords.map((k) => `<span>${esc(k)}</span>`).join('')}</div>
      <p class="type-desc">${esc(d.persona)}</p>
      <div class="type-score">最突出维度 ${score}/100 · 组合：${esc(top3)}</div>
      <div class="divider-fine"></div>
    </div>`;
}

// —— 2. 15 维雷达图（内联 SVG）——
export function renderRadar(report) {
  const size = 320, cx = size / 2, cy = size / 2, R = 118;
  const n = DIM_KEYS.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];

  // 背景网格（4 层）
  let grid = '';
  for (let g = 1; g <= 4; g++) {
    const r = (R * g) / 4;
    const pts = DIM_KEYS.map((_, i) => pt(i, r).map((v) => v.toFixed(1)).join(',')).join(' ');
    grid += `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1"/>`;
  }
  // 轴线 + 标签
  let axes = '', labels = '';
  DIM_KEYS.forEach((k, i) => {
    const [x, y] = pt(i, R);
    axes += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--border)" stroke-width="1"/>`;
    const [lx, ly] = pt(i, R + 16);
    const anchor = Math.abs(lx - cx) < 8 ? 'middle' : lx > cx ? 'start' : 'end';
    labels += `<text x="${lx.toFixed(1)}" y="${(ly + 3).toFixed(1)}" font-size="10" fill="var(--ink-soft)" text-anchor="${anchor}">${DIMS_META[k].name}</text>`;
  });
  // 数据多边形
  const dataPts = DIM_KEYS.map((k, i) => {
    const r = (R * (report.dims[k].score || 0)) / 100;
    return pt(i, r).map((v) => v.toFixed(1)).join(',');
  }).join(' ');

  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">RADAR</span><h2>十五维倾向图</h2></div>
      <div style="text-align:center;overflow-x:auto">
        <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="max-width:100%" role="img" aria-label="十五维倾向雷达图">
          ${grid}${axes}
          <polygon points="${dataPts}" fill="rgba(176,138,82,0.18)" stroke="var(--gold)" stroke-width="2"/>
          ${labels}
        </svg>
      </div>
    </div>`;
}

// —— 3. 降序排行条 ——
export function renderRanking(report) {
  const rows = report.dimRank.map((d, i) => {
    const color = colorOf(d.key);
    const dim = DIMENSIONS[d.key];
    return `<div class="rank-item">
      <div class="rank-head">
        <span class="rank-no">${i + 1}</span>
        <span class="rank-name" style="color:${color}">${dim.name}</span>
        <span class="rank-score">${d.score}</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${d.score}%;background:${color}"></div></div>
      <p class="rank-desc">${esc(dim.def)}</p>
    </div>`;
  }).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">RANKING</span><h2>十五维 · 从高到低</h2></div>
      ${rows}
    </div>`;
}

// —— 4. 突出维详解（Top 3-5）——
export function renderTopDims(report) {
  const cards = report.topDims.map((t) => {
    const d = DIMENSIONS[t.key];
    const lowEv = t.evidence < 3;
    return `<div class="attr-card">
      <h3>${d.name} <span class="attr-score">${t.score}/100</span></h3>
      <div class="en" style="font-size:11px;letter-spacing:.2em;color:var(--ink-faint)">${esc(d.en)}</div>
      <p style="margin-top:8px">${esc(d.persona)}</p>
      <dl>
        <dt>极端的一面</dt><dd>${esc(d.extreme)}</dd>
        <dt>典型行为</dt><dd>${d.behaviors.map(esc).join('；')}</dd>
        <dt>潜在需求</dt><dd>${esc(d.needs)}</dd>
        <dt>优势</dt><dd>${esc(d.positive)}</dd>
        <dt>盲点</dt><dd>${esc(d.watch)}</dd>
      </dl>
      ${lowEv ? '<div class="disclaimer">该维度相关题目作答较少，仅供参考。</div>' : ''}
    </div>`;
  }).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">TOP TRAITS</span><h2>最突出的几个维度</h2></div>
      ${cards}
    </div>`;
}

// —— 5. 隐藏需求 ——
export function renderNeeds(report) {
  const top = report.needs.slice(0, 6);
  const max = Math.max(...top.map((n) => n.score), 1);
  const rows = top.map((n) => `
    <div class="need-row">
      <span class="need-name">${esc(n.name)}</span>
      <div class="need-track"><div class="need-fill" style="width:${Math.round((n.score / max) * 100)}%"></div></div>
    </div>
    <p class="faint" style="margin:-4px 0 8px 104px">${esc(n.desc)}</p>`).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">HIDDEN NEEDS</span><h2>隐藏需求</h2></div>
      <p class="muted">根据你的答题，你在关系里相对最看重的是：</p>
      ${rows}
    </div>`;
}

// —— 6. 恋爱反差 ——
export function renderContrast(report) {
  if (!report.contrasts.length) return '';
  const items = report.contrasts.slice(0, 3).map((c) =>
    `<div class="contrast-item">
      <div class="think">你以为：${esc(c.think)}</div>
      <div class="actual">但实际行为更接近：${esc(c.actual)}</div>
    </div>`).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">THE CONTRAST</span><h2>恋爱反差</h2></div>
      <p class="muted">在一些情境里，你的自我认知和实际反应之间出现了稳定的落差：</p>
      ${items}
      <div class="disclaimer">反差由多道对照题交叉得出；它不是矛盾，而是你更真实、也更可爱的一面。</div>
    </div>`;
}

// —— 7. 冲突模式 ——
export function renderConflict(report) {
  const styles = conflictStyle(report).map((s) => `
    <div class="attr-card">
      <h3>${esc(s.name)}</h3>
      <dl>
        <dt>优势</dt><dd>${esc(s.good)}</dd>
        <dt>风险</dt><dd>${esc(s.risk)}</dd>
        <dt>可实践的建议</dt><dd>${esc(s.tip)}</dd>
      </dl>
    </div>`).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">CONFLICT</span><h2>冲突模式</h2></div>
      ${styles}
    </div>`;
}

// —— 8. 容易被吸引 ——
export function renderAttraction(report) {
  const a = ATTRACTION[report.mainDimKey];
  const tags = a.traits.map((t) => `<span class="match-tag">${esc(t)}</span>`).join(' ');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">DRAWN TO</span><h2>你可能容易被吸引</h2></div>
      <p style="margin-bottom:10px">${tags}</p>
      <p class="muted">${esc(a.text)}</p>
    </div>`;
}

// —— 9. 维度匹配 ——
export function renderMatching(report) {
  const main = report.mainDimKey;
  const others = report.dimRank.filter((d) => d.key !== main).slice(0, 3);
  const items = others.map((o) => {
    const note = getPairNote(main, o.key);
    const color = colorOf(o.key);
    return `<div class="match-item">
      <h3><span style="color:${color}">${DIMS_META[main].name} × ${DIMS_META[o.key].name}</span></h3>
      <dl class="attr-card" style="background:transparent;border:none;padding:0;margin:0">
        <dt>吸引点</dt><dd>${esc(note.draw)}</dd>
        <dt>互补点</dt><dd>${esc(note.comp)}</dd>
        <dt>需磨合</dt><dd>${esc(note.clash)}</dd>
      </dl>
    </div>`;
  }).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">MATCHING</span><h2>维度匹配</h2></div>
      ${items}
      <div class="disclaimer">维度相同不必然适配，互补也不必然适配，此处仅为趣味参考。</div>
    </div>`;
}

// —— 10. 成长建议 ——
export function renderGrowth(report) {
  const items = growthAdvice(report).map((a) => `<li>${esc(a)}</li>`).join('');
  return `
    <div class="card">
      <div class="card-title"><span class="eyebrow">GROW</span><h2>个性化成长建议</h2></div>
      <ul class="list-tight">${items}</ul>
    </div>`;
}

// 低确定性提示
export function renderConfidence(report) {
  if (!report.lowConfidence) return '';
  return `<div class="card"><div class="disclaimer">你完成的题目较少（${report.answeredCount}/${report.totalQuestions}），
    部分结果的确定性较低。完整作答能让画像更贴近真实的你。</div></div>`;
}
