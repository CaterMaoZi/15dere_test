// results-copy.js —— 结果页动态文案（冲突模式、成长建议），基于 15 维得分
import { DIMENSIONS } from './dimensions.js';

const s = (report, k) => report.dims[k]?.score ?? 0;

// 冲突模式：按相关维度得分判定主导策略，返回 1-2 条
export function conflictStyle(report) {
  const out = [];
  const dilei = s(report, 'dilei'), baojiao = s(report, 'baojiao');
  const qingxing = s(report, 'qingxing'), natural = s(report, 'natural');
  const yujiao = s(report, 'yujiao'), aoman = s(report, 'aoman'), sanwu = s(report, 'sanwu');

  if (dilei >= 55 || baojiao >= 55) out.push({
    name: '情绪爆发型',
    good: '你不藏着掖着，情绪来了就表现出来，对方不用费力猜你的状态。',
    risk: '上头时容易突然失控、说出事后后悔的话，或把小事点成大火。',
    tip: '感到快要引爆时，先给自己几分钟物理隔离——离开现场、深呼吸，等那股劲过去再开口。',
  });
  if (qingxing >= 55 && natural >= 45) out.push({
    name: '主动沟通型',
    good: '你愿意冷静后把问题讲开，就事论事，不容易积压旧怨。',
    risk: '偶尔太理性，会让还在情绪里的对方觉得你不够共情。',
    tip: '先接住对方的情绪、再讲道理，沟通会顺很多。',
  });
  if (aoman >= 55) out.push({
    name: '僵持防御型',
    good: '你有原则，不会为了和好轻易放弃自己的立场。',
    risk: '谁都不肯先低头，小矛盾容易拖成冷战。',
    tip: '把先道歉理解成对关系的投资而非认输，主动一次往往化解一片。',
  });
  if (yujiao >= 55 || sanwu >= 55) out.push({
    name: '压抑回避型',
    good: '你不轻易把冲突扩大，给了关系缓冲。',
    risk: '憋着不说会让情绪越积越沉，也让对方摸不透你。',
    tip: '练习把一个小情绪及时、温和地说出来，别等它攒成大委屈。',
  });
  if (out.length === 0) out.push({
    name: '协商平衡型',
    good: '你在表达和克制之间比较平衡，能看情况灵活应对。',
    risk: '偶尔会摇摆，不确定先处理情绪还是先讲道理。',
    tip: '先共情、再讲事实、最后谈方案，三步能让沟通更稳。',
  });
  return out.slice(0, 2);
}

// 成长建议：按突出维/短板动态生成 3-5 条
export function growthAdvice(report) {
  const out = [];
  const has = (k, th = 55) => s(report, k) >= th;

  if (has('dilei')) out.push('当情绪突然涌上来时，试着先按下暂停键——离开现场几分钟再回应。你的在乎是真的，但别让一时的引爆伤到你珍惜的人和你自己。');
  if (has('baojiao')) out.push('你表达一向直接而强烈，这很真实。练习在开口前给情绪一个缓冲，让坦白不越过伤人的边界。');
  if (has('aojiao')) out.push('你习惯用别扭和嘴硬包住在乎，但对方未必每次都能翻译。偶尔把真话直接说出口，会少很多错过。');
  if (has('zhongli')) out.push('你的爱很重，重到常常自己默默扛、用牺牲和"我都是为你"把人留住。练习把沉重换成坦白的需求——"我需要你"远比"我为你牺牲"更能让对方靠近，也让你不必独自内耗。');
  if (has('yujiao')) out.push('你渴望被懂，却总把错揽到自己身上、靠讨好挽留。请记住：关系出问题不一定是你不够好。先相信"你本来就值得被爱"，再把低落说出口——哪怕一句"我今天不太好"。');
  if (has('aoman')) out.push('你有自己的骄傲和标准，这没错。但在亲密关系里，适度示弱、主动认错不是输，而是让对方更靠近的方式。');
  if (has('bingjiao')) out.push('你爱得专注，怕失去时容易向外抓——想掌控、想归咎别人。把不安说成具体的需求，而不是化成监控或试探，占有不等于爱，信任要双向养。');
  if (has('fuli') || has('qingxing')) out.push('你很独立清醒，别让它变成不给对方靠近的机会。偶尔主动示弱、让对方照顾你，也是一种亲密。');
  if (has('canian')) out.push('你笨拙但认真，别因为一次没做好就否定自己。心意比完美更珍贵，被接纳时你会越来越自如。');
  if (has('natural')) out.push('你的真诚是稀有的礼物。在保持本色的同时，学着分辨真心与盲目信任，为自己留一点边界。');
  if (has('dianbo')) out.push('你珍视精神共鸣，但别把"他应该懂"当默认。偶尔用直白的语言说出来，共鸣才不会变成单方面的期待。');

  if (out.length < 3) {
    out.push('在表达需求的同时，也主动了解对方的需求——两个人的节奏对上了，关系才走得稳。');
    out.push('记得这份结果只是一面镜子，照见倾向而非定义你。你永远可以选择成为更舒服的自己。');
  }
  return out.slice(0, 5);
}

export { DIMENSIONS };
