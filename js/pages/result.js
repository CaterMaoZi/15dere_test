// result.js —— 结果页装配：读取进度 → 评分 → 渲染板块
import { QUESTIONS } from '../data/questions.js';
import { loadProgress } from '../core/storage.js';
import { scoreTest } from '../core/scoring.js';
import {
  renderMainDim, renderRadar, renderRanking, renderTopDims, renderNeeds,
  renderContrast, renderConflict, renderAttraction, renderMatching, renderGrowth, renderConfidence,
} from '../core/render.js';

const progress = loadProgress();
const answers = progress?.answers || {};

if (!answers || Object.keys(answers).length === 0) {
  document.getElementById('sections').innerHTML =
    `<div class="card"><p>还没有答题记录。</p><a class="btn btn-primary" href="test.html">去测试</a></div>`;
} else {
  const report = scoreTest(answers, QUESTIONS);

  const html = [
    renderConfidence(report),
    renderMainDim(report),
    renderRadar(report),
    renderRanking(report),
    renderTopDims(report),
    renderNeeds(report),
    renderContrast(report),
    renderConflict(report),
    renderAttraction(report),
    renderMatching(report),
    renderGrowth(report),
  ].join('');
  document.getElementById('sections').innerHTML = html;
}
