// test.js —— 答题页逻辑：渲染、导航、进度存储、恢复
import { QUESTIONS, MODULES } from '../data/questions.js';
import { loadProgress, saveProgress, clearProgress } from '../core/storage.js';

const params = new URLSearchParams(location.search);
if (params.has('restart')) clearProgress();

const saved = params.has('restart') ? null : loadProgress();
let answers = saved?.answers ? { ...saved.answers } : {};
let index = params.has('resume') && saved ? Math.min(saved.index || 0, QUESTIONS.length - 1) : (saved?.index || 0);

const $block = document.getElementById('question-block');
const $prev = document.getElementById('prev-btn');
const $next = document.getElementById('next-btn');
const $counter = document.getElementById('counter');
const $moduleLabel = document.getElementById('module-label');
const $progress = document.getElementById('progress-fill');
const $saveState = document.getElementById('save-state');

function flashSaved(ok) {
  $saveState.textContent = ok ? '已保存' : '保存失败（可继续答题）';
  $saveState.style.opacity = '1';
  setTimeout(() => { $saveState.style.opacity = '0.5'; }, 800);
}

function persist() {
  const ok = saveProgress({ answers, index });
  flashSaved(ok);
}

function render() {
  const q = QUESTIONS[index];
  const mod = MODULES[q.module];
  $moduleLabel.textContent = `模块 ${q.module} · ${mod.title}`;
  $counter.textContent = `${index + 1} / ${QUESTIONS.length}`;
  $progress.style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;

  const chosen = answers[q.id];
  const optionsHtml = q.options.map((o) => {
    const sel = chosen === o.key ? ' selected' : '';
    return `<button class="option${sel}" data-key="${o.key}" type="button">
      <span class="opt-key">${o.key}</span>
      <span class="opt-text">${o.text}</span>
    </button>`;
  }).join('');

  $block.innerHTML = `
    <p class="module-label">${typeLabel(q.type)}</p>
    <h2 class="question-text">${q.text}</h2>
    <div class="options">${optionsHtml}</div>
  `;

  $block.querySelectorAll('.option').forEach((btn) => {
    btn.addEventListener('click', () => {
      answers[q.id] = btn.dataset.key;
      $block.querySelectorAll('.option').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      persist();
      // 选完短暂停顿自动进入下一题（最后一题不跳）
      if (index < QUESTIONS.length - 1) {
        setTimeout(() => { index++; persist(); render(); scrollTop(); }, 260);
      } else {
        updateNav();
      }
    });
  });

  updateNav();
}

function typeLabel(t) {
  return ({
    frequency: '行为频率', scenario: '情境选择', action: '主动行为',
    counterfactual: '对照假设', self: '自我认知', actual: '实际行为', likert: '倾向自评',
  })[t] || '题目';
}

function updateNav() {
  $prev.disabled = index === 0;
  const isLast = index === QUESTIONS.length - 1;
  const answeredAll = QUESTIONS.every((q) => answers[q.id] != null);
  if (isLast) {
    $next.textContent = answeredAll ? '查看结果' : '查看结果（有未答题）';
    $next.classList.toggle('btn-primary', true);
  } else {
    $next.textContent = '下一题';
  }
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

$prev.addEventListener('click', () => {
  if (index > 0) { index--; persist(); render(); scrollTop(); }
});

$next.addEventListener('click', () => {
  if (index < QUESTIONS.length - 1) {
    index++; persist(); render(); scrollTop();
  } else {
    // 最后一题 → 结果页
    persist();
    location.href = 'result.html';
  }
});

render();
