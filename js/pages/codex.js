// codex.js —— 图鉴页：完整渲染 15 维
import { DIMENSIONS } from '../data/dimensions.js';
import { DIM_KEYS, DIMS_META } from '../core/keys.js';

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

const grid = document.getElementById('dims-grid');
grid.innerHTML = DIM_KEYS.map((k, i) => {
  const d = DIMENSIONS[k];
  return `<div class="codex-entry">
    <h3><span class="color-dot" style="background:${DIMS_META[k].color}"></span>${i + 1}. ${d.name}
      <span class="en">${esc(d.en)}</span></h3>
    <div class="kw">${d.keywords.map(esc).join(' · ')}</div>
    <p>${esc(d.def)}</p>
    <dl>
      <dt>是什么样的人</dt><dd>${esc(d.persona)}</dd>
      <dt>极端的一面</dt><dd>${esc(d.extreme)}</dd>
      <dt>典型行为</dt><dd>${d.behaviors.map(esc).join('；')}</dd>
      <dt>潜在需求</dt><dd>${esc(d.needs)}</dd>
      <dt>积极表现</dt><dd>${esc(d.positive)}</dd>
      <dt>需要留意</dt><dd>${esc(d.watch)}</dd>
      <dt>与相近维度的区别</dt><dd>${esc(d.distinct)}</dd>
      <dt>适合的沟通方式</dt><dd>${esc(d.communication)}</dd>
    </dl>
  </div>`;
}).join('');
