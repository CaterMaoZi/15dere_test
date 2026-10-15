// storage.js —— 本地进度存取（localStorage），刷新后恢复
// 失败时静默降级（隐私模式 / file:// 限制），不影响核心答题流程。

import { STORAGE_KEY } from './keys.js';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    return {
      answers: data.answers || {},
      index: Number.isInteger(data.index) ? data.index : 0,
      updatedAt: data.updatedAt || null,
    };
  } catch {
    return null;
  }
}

export function saveProgress({ answers, index }) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, index, updatedAt: Date.now() })
    );
    return true;
  } catch {
    return false;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* 忽略 */
  }
}

export function hasProgress() {
  const p = loadProgress();
  return !!(p && Object.keys(p.answers).length > 0);
}
