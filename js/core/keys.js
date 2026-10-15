// keys.js —— 全局统一标识常量（15 维综合体系）
// 恋爱测试采用扁平的 15 个"系"维度，不再区分基础类型/隐藏属性两层。
// 维度含义经搜索核实（日系 ACGN moe 角色属性 + J-fashion 亚文化）。

// ===== 15 维度 key（顺序固定，雷达图/排行按此遍历）=====
export const DIM_KEYS = [
  'natural',  // 天然系
  'qingfu',   // 轻浮系
  'dianbo',   // 电波系
  'dilei',    // 地雷系
  'zhongli',  // 重力系
  'fuli',     // 浮力系
  'sanwu',    // 三无系
  'aojiao',   // 傲娇系
  'baojiao',  // 暴娇系
  'bingjiao', // 病娇系
  'fancha',   // 反差系
  'qingxing', // 清醒系
  'aoman',    // 傲慢系
  'canian',   // 残念系
  'yujiao',   // 郁娇系
];

// 维度展示元信息：中文名、英文名、关键词、雷达/条形配色
export const DIMS_META = {
  natural:  { name: '天然系', en: 'NATURAL',     color: '#8ba888', keywords: ['单纯', '慢热', '治愈'] },
  qingfu:   { name: '轻浮系', en: 'AIRY',        color: '#8fa3bf', keywords: ['轻盈', '会玩', '不定性'] },
  dianbo:   { name: '电波系', en: 'DENPA',       color: '#a593c4', keywords: ['清奇', '小众', '频率独特'] },
  dilei:    { name: '地雷系', en: 'LANDMINE',    color: '#d08ba3', keywords: ['甜而危险', '情绪强烈', '随时爆雷'] },
  zhongli:  { name: '重力系', en: 'GRAVITY',     color: '#9e5a5a', keywords: ['浓烈', '患得患失', '精神内耗'] },
  fuli:     { name: '浮力系', en: 'BUOYANT',     color: '#7fa8a0', keywords: ['轻盈', '缥缈', '不捆绑'] },
  sanwu:    { name: '三无系', en: 'STILL',       color: '#9aa0a8', keywords: ['克制', '疏离', '外冷内热'] },
  aojiao:   { name: '傲娇系', en: 'TSUNDERE',    color: '#c99a6e', keywords: ['口嫌体直', '别扭', '嘴硬心软'] },
  baojiao:  { name: '暴娇系', en: 'FIERCE',      color: '#c76b6b', keywords: ['炸毛', '心软', '反差'] },
  bingjiao: { name: '病娇系', en: 'YANDERE',     color: '#b56b86', keywords: ['偏执', '占有', '向外极端'] },
  fancha:   { name: '反差系', en: 'CONTRAST',    color: '#8e86b8', keywords: ['表里相反', '多层', '惊喜'] },
  qingxing: { name: '清醒系', en: 'LUCID',       color: '#6f93b0', keywords: ['理性', '边界', '自主'] },
  aoman:    { name: '傲慢系', en: 'HAUGHTY',     color: '#b08a52', keywords: ['高自尊', '不低头', '漠视'] },
  canian:   { name: '残念系', en: 'HAPLESS',     color: '#b59b74', keywords: ['可惜', '笨拙', '差一口气'] },
  yujiao:   { name: '郁娇系', en: 'MELANCHOLIC', color: '#7c8aa0', keywords: ['阴郁', '自责', '向内卑微'] },
};

// 便捷：维度中文名映射
export const DIM_NAMES = Object.fromEntries(
  DIM_KEYS.map((k) => [k, DIMS_META[k].name])
);

// 本地存储 key
export const STORAGE_KEY = 'love-type-test/progress-v2';
