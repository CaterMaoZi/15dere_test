// questions.js —— 正式题库（15 维综合体系，目标约 75 题）
// 题型 type：frequency 行为频率 / scenario 情境选择 / action 主动行为 /
//           counterfactual 反事实对照 / self 自我认知 / actual 实际行为
// 评分 scores：直接给 15 维中若干维记分（可正可负 → 支持反向计分）。
// 反差对照题：consistencyGroup 分组，compareRole(self|actual)，compareDim(比较轴=某个维度),
//            contrastSelf / contrastActual 为反差文案。
// skip:true 的选项为「不适用/从未发生」，不参与计分。
// 维度 key：natural qingfu dianbo dilei zhongli fuli sanwu aojiao baojiao
//           bingjiao fancha qingxing aoman canian yujiao

export const MODULES = {
  1: { title: '真实自我与外在形象', en: 'TRUE SELF' },
  2: { title: '主动追求与行动力', en: 'PROACTIVITY' },
  3: { title: '情感表达与沟通', en: 'EXPRESSION' },
  4: { title: '安全感与情绪波动', en: 'EMOTION' },
  5: { title: '嫉妒、占有与边界', en: 'BOUNDARY' },
  6: { title: '冲突、爆发与修复', en: 'CONFLICT' },
  7: { title: '付出、承诺与投入', en: 'COMMITMENT' },
  8: { title: '新鲜感、自由与节奏', en: 'FREEDOM' },
  9: { title: '隐藏需求与反差', en: 'HIDDEN' },
  10: { title: '理想关系与需求', en: 'IDEAL' },
};

export const QUESTIONS = [
  // ============ 模块 1：真实自我与外在形象 ============
  {
    id: 'Q101', module: 1, type: 'scenario',
    text: '你更希望别人眼中的你是？',
    options: [
      { key: 'A', text: '真诚温暖、让人放松。', scores: { natural: 2 } },
      { key: 'B', text: '有趣好玩、相处轻松。', scores: { qingfu: 2 } },
      { key: 'C', text: '独特有想法、聊得深。', scores: { dianbo: 2 } },
      { key: 'D', text: '可靠认真、值得托付。', scores: { zhongli: 2 } },
      { key: 'E', text: '清醒独立、有自己的边界。', scores: { qingxing: 2, fuli: 1 } },
    ],
  },
  {
    id: 'Q102', module: 1, type: 'frequency',
    text: '你多经常「嘴上说不在意，其实心里很在意」？',
    options: [
      { key: 'A', text: '几乎从不，在意就会说。', scores: { natural: 2 } },
      { key: 'B', text: '偶尔会。', scores: { aojiao: 1 } },
      { key: 'C', text: '挺经常的。', scores: { aojiao: 2, fancha: 1 } },
      { key: 'D', text: '几乎总是这样。', scores: { aojiao: 2, fancha: 2 } },
    ],
  },
  {
    id: 'Q103', module: 1, type: 'scenario',
    text: '心情很糟但不想让人担心时，你通常会？',
    options: [
      { key: 'A', text: '照常表现，装作没事，自己消化。', scores: { sanwu: 2 } },
      { key: 'B', text: '表面平静，但暗暗希望对方察觉。', scores: { yujiao: 2, aojiao: 1 } },
      { key: 'C', text: '直接说「我现在不太好」。', scores: { natural: 2 } },
      { key: 'D', text: '情绪没憋住，可能突然就爆发或低落。', scores: { dilei: 2, baojiao: 1 } },
    ],
  },
  {
    id: 'Q104', module: 1, type: 'scenario',
    text: '别人说你「看起来很高冷」，你的真实情况多半是？',
    options: [
      { key: 'A', text: '确实情绪平稳，没那么多起伏。', scores: { sanwu: 2 } },
      { key: 'B', text: '其实熟了之后很热情、判若两人。', scores: { fancha: 2 } },
      { key: 'C', text: '我本来就不冷，是误会。', scores: { natural: 1 } },
      { key: 'D', text: '是有点骄傲，不轻易对人热络。', scores: { aoman: 2 } },
    ],
  },
  {
    id: 'Q105', module: 1, type: 'self',
    consistencyGroup: 'lucid-01', compareRole: 'self', compareDim: 'qingxing',
    contrastSelf: '你认为自己在恋爱里很清醒、不会被情绪冲昏头',
    contrastActual: '真正投入时，你其实很容易被情绪牵着走',
    text: '你觉得自己在恋爱里理性吗？',
    options: [
      { key: 'A', text: '很理性，情绪上头也能抽离分析。', scores: { qingxing: 2 } },
      { key: 'B', text: '比较理性，但也会心软。', scores: { qingxing: 1 } },
      { key: 'C', text: '一般，容易被感觉带着走。', scores: { qingxing: 0, dilei: 1 } },
      { key: 'D', text: '不太理性，爱起来就不管不顾。', scores: { dilei: 1, bingjiao: 1 } },
    ],
  },
  {
    id: 'Q106', module: 1, type: 'scenario',
    text: '当你理想中的自己和真实表现有落差时，你更接近？',
    options: [
      { key: 'A', text: '想做得很好，但常常笨拙地出错。', scores: { canian: 2 } },
      { key: 'B', text: '理性接受落差，调整就好。', scores: { qingxing: 2 } },
      { key: 'C', text: '会把理想藏在心里，不轻易展示。', scores: { yujiao: 1, dianbo: 1 } },
      { key: 'D', text: '基本一致，我比较表里如一。', scores: { natural: 2 } },
    ],
  },
  {
    id: 'Q107', module: 1, type: 'scenario',
    text: '面对喜欢的人，你和平时相比？',
    options: [
      { key: 'A', text: '更拘谨别扭，反而放不开。', scores: { aojiao: 2, canian: 1 } },
      { key: 'B', text: '会更用心，但大体还是我自己。', scores: { natural: 1 } },
      { key: 'C', text: '几乎一致，不太因人而变。', scores: { qingxing: 1, sanwu: 1 } },
      { key: 'D', text: '不自觉想展示更好、更强的一面。', scores: { aoman: 2 } },
    ],
  },

  // ============ 模块 2：主动追求与行动力 ============
  {
    id: 'Q201', module: 2, type: 'scenario',
    text: '你遇到一个非常喜欢的人，但只是普通朋友。你很想单独相处，更可能？',
    options: [
      { key: 'A', text: '找个自然理由直接邀请对方。', scores: { natural: 2 } },
      { key: 'B', text: '等待对方主动邀请。', scores: { fuli: 1, sanwu: 1 } },
      { key: 'C', text: '暗示想见面，但不直接邀请。', scores: { aojiao: 2 } },
      { key: 'D', text: '确认对方可能也喜欢我，才敢行动。', scores: { qingxing: 1, yujiao: 1 } },
      { key: 'E', text: '就算很喜欢也先端着，怕显得太主动。', scores: { aoman: 2, aojiao: 1 } },
    ],
  },
  {
    id: 'Q202', module: 2, type: 'frequency',
    text: '过去喜欢一个人时，你主动发起聊天的频率大概是？',
    options: [
      { key: 'A', text: '几乎每次都是我主动。', scores: { zhongli: 1, natural: 1 } },
      { key: 'B', text: '多数时候我先开口。', scores: { natural: 1 } },
      { key: 'C', text: '大致一半一半。', scores: { qingxing: 1 } },
      { key: 'D', text: '很少，基本等对方来找我。', scores: { fuli: 1, aoman: 1 } },
      { key: 'E', text: '没有相关经历。', skip: true },
    ],
  },
  {
    id: 'Q203', module: 2, type: 'action',
    text: '喜欢的人心情不好但没倾诉，你会怎么主动关心？',
    options: [
      { key: 'A', text: '直接问「你怎么了，要不要聊聊」。', scores: { natural: 2 } },
      { key: 'B', text: '默默做点让对方舒服的小事，不点破。', scores: { sanwu: 1, natural: 1 } },
      { key: 'C', text: '旁敲侧击试探，但不直接问。', scores: { aojiao: 1, dianbo: 1 } },
      { key: 'D', text: '想关心却不知怎么开口，常错过时机。', scores: { canian: 2 } },
      { key: 'E', text: '觉得该给空间，等对方自己说。', scores: { fuli: 1, qingxing: 1 } },
    ],
  },
  {
    id: 'Q204', module: 2, type: 'scenario',
    text: '你想推进关系、确认定位，但对方没主动提。你会？',
    options: [
      { key: 'A', text: '找机会直接把话说开。', scores: { zhongli: 2, natural: 1 } },
      { key: 'B', text: '用行动加深关系，等水到渠成。', scores: { natural: 1, zhongli: 1 } },
      { key: 'C', text: '暗示几次，看对方接不接。', scores: { aojiao: 2 } },
      { key: 'D', text: '继续等，怕主动提会把关系推坏。', scores: { canian: 1, yujiao: 1 } },
    ],
  },
  {
    id: 'Q205', module: 2, type: 'scenario',
    text: '你表白被明确拒绝了，你最可能？',
    options: [
      { key: 'A', text: '尊重选择，体面退出。', scores: { qingxing: 2 } },
      { key: 'B', text: '难过一阵，但不会纠缠。', scores: { natural: 1, fuli: 1 } },
      { key: 'C', text: '还想再争取，不甘心。', scores: { zhongli: 1, bingjiao: 1 } },
      { key: 'D', text: '表面放下，心里久久放不下。', scores: { yujiao: 2 } },
    ],
  },
  {
    id: 'Q206', module: 2, type: 'counterfactual',
    text: '假如你很确定对方也喜欢你、不会拒绝，你的主动程度会？',
    options: [
      { key: 'A', text: '一样主动，有没有把握都会行动。', scores: { natural: 2 } },
      { key: 'B', text: '会明显更主动，确定了才敢。', scores: { yujiao: 1, canian: 1 } },
      { key: 'C', text: '差别不大，我本来就偏被动。', scores: { fuli: 1, sanwu: 1 } },
      { key: 'D', text: '反而想端着，等对方更主动。', scores: { aoman: 2, aojiao: 1 } },
    ],
  },
  {
    id: 'Q207', module: 2, type: 'scenario',
    text: '为喜欢的人，你愿意调整自己的安排到什么程度？',
    options: [
      { key: 'A', text: '愿意腾出时间，但有底线。', scores: { zhongli: 1, qingxing: 1 } },
      { key: 'B', text: '很愿意，甚至常把对方放第一位。', scores: { zhongli: 2, bingjiao: 1 } },
      { key: 'C', text: '尽量不打乱自己的节奏。', scores: { fuli: 2 } },
      { key: 'D', text: '看心情和阶段，不固定。', scores: { qingfu: 2 } },
    ],
  },

  // ============ 模块 3：情感表达与沟通 ============
  {
    id: 'Q301', module: 3, type: 'frequency',
    text: '你多经常直接对喜欢的人说「我想你 / 我喜欢你」？',
    options: [
      { key: 'A', text: '很自然就说得出口。', scores: { natural: 2 } },
      { key: 'B', text: '偶尔会，但要酝酿一下。', scores: { qingxing: 1 } },
      { key: 'C', text: '很少，觉得难为情。', scores: { aojiao: 2 } },
      { key: 'D', text: '几乎说不出口，用别的方式代替。', scores: { sanwu: 1, aojiao: 1 } },
    ],
  },
  {
    id: 'Q302', module: 3, type: 'scenario',
    text: '你最习惯用哪种方式表达喜欢？',
    options: [
      { key: 'A', text: '直接说出来。', scores: { natural: 2 } },
      { key: 'B', text: '用行动和陪伴。', scores: { zhongli: 1, natural: 1 } },
      { key: 'C', text: '靠幽默调侃和打闹。', scores: { qingfu: 2 } },
      { key: 'D', text: '用只有彼此懂的默契和暗示。', scores: { dianbo: 2, aojiao: 1 } },
    ],
  },
  {
    id: 'Q303', module: 3, type: 'scenario',
    text: '对方送上甜言蜜语时，你的反应更接近？',
    options: [
      { key: 'A', text: '很受用，也会甜回去。', scores: { natural: 1, qingfu: 1 } },
      { key: 'B', text: '开心但会害羞，嘴上可能嫌弃。', scores: { aojiao: 2, fancha: 1 } },
      { key: 'C', text: '觉得甜但有点不知所措。', scores: { canian: 1, sanwu: 1 } },
      { key: 'D', text: '更信行动，花言巧语打动不了我。', scores: { qingxing: 2 } },
    ],
  },
  {
    id: 'Q304', module: 3, type: 'self',
    consistencyGroup: 'express-01', compareRole: 'self', compareDim: 'natural',
    contrastSelf: '你认为自己需要什么会直接开口要',
    contrastActual: '实际上你更常把需求憋着，希望对方自己察觉',
    text: '关系里你需要什么的时候，一般会？',
    options: [
      { key: 'A', text: '直接说出我的需求。', scores: { natural: 2 } },
      { key: 'B', text: '委婉提一下。', scores: { aojiao: 1 } },
      { key: 'C', text: '希望对方主动察觉，不想开口。', scores: { yujiao: 1, dianbo: 1 } },
      { key: 'D', text: '干脆忍着，不给对方添麻烦。', scores: { sanwu: 2 } },
    ],
  },
  {
    id: 'Q305', module: 3, type: 'actual',
    consistencyGroup: 'express-01', compareRole: 'actual', compareDim: 'natural',
    text: '你很想让对方多陪你，但对方最近很忙。你实际会？',
    options: [
      { key: 'A', text: '直说「我有点想你，能多陪我吗」。', scores: { natural: 2 } },
      { key: 'B', text: '轻描淡写提一句，看反应。', scores: { aojiao: 1 } },
      { key: 'C', text: '不说，但会因落差而低落。', scores: { yujiao: 2 } },
      { key: 'D', text: '憋着，表现得毫不在意。', scores: { sanwu: 1, fancha: 1 } },
    ],
  },
  {
    id: 'Q306', module: 3, type: 'frequency',
    text: '你多希望伴侣「不用我说就能读懂我的情绪」？',
    options: [
      { key: 'A', text: '非常希望，被秒懂才觉得被爱。', scores: { dianbo: 2, yujiao: 1 } },
      { key: 'B', text: '希望，但也知道该说还得说。', scores: { dianbo: 1, natural: 1 } },
      { key: 'C', text: '不太指望，我会直接讲。', scores: { natural: 2 } },
      { key: 'D', text: '无所谓，我情绪本来起伏就小。', scores: { sanwu: 2 } },
    ],
  },
  {
    id: 'Q307', module: 3, type: 'scenario',
    text: '你更接近下面哪种「不表达」？',
    options: [
      { key: 'A', text: '不是不表达，是不太懂怎么说。', scores: { canian: 2 } },
      { key: 'B', text: '不是不会，是不愿轻易示弱。', scores: { aoman: 2 } },
      { key: 'C', text: '不是不想，是怕说了被辜负。', scores: { yujiao: 1, dianbo: 1 } },
      { key: 'D', text: '我其实挺愿意表达的。', scores: { natural: 2 } },
    ],
  },

  // ============ 模块 4：安全感与情绪波动（地雷核心） ============
  {
    id: 'Q401', module: 4, type: 'scenario',
    text: '你发了很期待回复的消息，对方几小时没回却在发动态。你最可能？',
    options: [
      { key: 'A', text: '继续安排生活，等对方回。', scores: { fuli: 2, qingxing: 1 } },
      { key: 'B', text: '有些失落，但不表现出来。', scores: { yujiao: 1, aojiao: 1 } },
      { key: 'C', text: '主动问对方是不是在忙。', scores: { natural: 2 } },
      { key: 'D', text: '情绪一下子就上来了，忍不住想质问。', scores: { dilei: 2, baojiao: 1 } },
      { key: 'E', text: '开始脑补对方是不是不喜欢我了。', scores: { dilei: 1, bingjiao: 1 } },
    ],
  },
  {
    id: 'Q402', module: 4, type: 'frequency',
    text: '恋爱里，你的情绪多容易因为对方的一个小举动而剧烈起伏？',
    options: [
      { key: 'A', text: '几乎不会，我很稳。', scores: { sanwu: 2, qingxing: 1 } },
      { key: 'B', text: '偶尔，但能很快平复。', scores: { qingxing: 1 } },
      { key: 'C', text: '挺容易，心情像坐过山车。', scores: { dilei: 2 } },
      { key: 'D', text: '很容易，上一秒好好的下一秒就能炸或崩。', scores: { dilei: 2, baojiao: 1 } },
    ],
  },
  {
    id: 'Q403', module: 4, type: 'scenario',
    text: '对方临时取消了你很期待的约会，你的第一反应？',
    options: [
      { key: 'A', text: '有点可惜，但能理解。', scores: { qingxing: 1, fuli: 1 } },
      { key: 'B', text: '失落，需要点时间平复。', scores: { yujiao: 2 } },
      { key: 'C', text: '表面没事，心里介意。', scores: { aojiao: 1, fancha: 1 } },
      { key: 'D', text: '情绪瞬间被点着，很难不表现出来。', scores: { dilei: 2, baojiao: 1 } },
    ],
  },
  {
    id: 'Q404', module: 4, type: 'scenario',
    text: '当你情绪突然涌上来、快要失控时，你更接近？',
    options: [
      { key: 'A', text: '能及时按下暂停，先冷静。', scores: { qingxing: 2 } },
      { key: 'B', text: '表面压住，自己默默消化。', scores: { sanwu: 1, yujiao: 1 } },
      { key: 'C', text: '压不住，可能脱口说出事后后悔的话。', scores: { dilei: 2, baojiao: 1 } },
      { key: 'D', text: '直接向对方爆发，一贯如此。', scores: { baojiao: 2 } },
    ],
  },
  {
    id: 'Q405', module: 4, type: 'scenario',
    text: '信息不足、搞不清对方心意时，你更容易？',
    options: [
      { key: 'A', text: '往好处想，或直接问。', scores: { natural: 1, qingxing: 1 } },
      { key: 'B', text: '保持中立，再观察。', scores: { qingxing: 1, sanwu: 1 } },
      { key: 'C', text: '脑补很多剧情，情绪跟着大起大落。', scores: { dilei: 2 } },
      { key: 'D', text: '越想越钻进对方会离开的念头里。', scores: { bingjiao: 2, yujiao: 1 } },
    ],
  },
  {
    id: 'Q406', module: 4, type: 'frequency',
    text: '恋爱时你还能维持自己原本的生活节奏吗？',
    options: [
      { key: 'A', text: '完全可以，生活重心很稳。', scores: { fuli: 2, qingxing: 1 } },
      { key: 'B', text: '大体可以，分一部分给对方。', scores: { qingxing: 1 } },
      { key: 'C', text: '重心会明显向对方倾斜。', scores: { zhongli: 1, dilei: 1 } },
      { key: 'D', text: '容易被对方牵着走，情绪全系于他。', scores: { dilei: 2, bingjiao: 1 } },
    ],
  },
  {
    id: 'Q407', module: 4, type: 'self',
    consistencyGroup: 'calm-01', compareRole: 'self', compareDim: 'sanwu',
    contrastSelf: '你认为自己情绪很稳、不太会被影响',
    contrastActual: '关系一旦紧张，你其实很容易情绪波动、甚至突然引爆',
    text: '你怎么评价自己的情绪稳定度？',
    options: [
      { key: 'A', text: '非常稳，很少大起大落。', scores: { sanwu: 2 } },
      { key: 'B', text: '比较稳，偶有波动。', scores: { qingxing: 1 } },
      { key: 'C', text: '一般，看状态。', scores: { dilei: 1 } },
      { key: 'D', text: '不太稳，容易被触动。', scores: { dilei: 1, yujiao: 1 } },
    ],
  },
  {
    id: 'Q408', module: 4, type: 'actual',
    consistencyGroup: 'calm-01', compareRole: 'actual', compareDim: 'sanwu',
    text: '对方说了句让你很在意的话、态度突然冷下来，你实际会？',
    options: [
      { key: 'A', text: '不动声色，照常，心里也没太大波澜。', scores: { sanwu: 2 } },
      { key: 'B', text: '有点在意，但能自己消化。', scores: { qingxing: 1, yujiao: 1 } },
      { key: 'C', text: '情绪立刻被牵动，表现得很明显。', scores: { dilei: 2 } },
      { key: 'D', text: '当场就绷不住，可能直接发作。', scores: { dilei: 2, baojiao: 1 } },
    ],
  },

  // ============ 模块 5：嫉妒、占有与边界 ============
  {
    id: 'Q501', module: 5, type: 'scenario',
    text: '伴侣和某位暧昧对象走得较近，你的第一反应？',
    options: [
      { key: 'A', text: '信任为主，不太会多想。', scores: { qingxing: 2, fuli: 1 } },
      { key: 'B', text: '会在意，但选择直接沟通。', scores: { natural: 1, zhongli: 1 } },
      { key: 'C', text: '心里不舒服，表面装没事。', scores: { aojiao: 1, yujiao: 1 } },
      { key: 'D', text: '情绪一下炸开，忍不住质问或翻脸。', scores: { dilei: 1, baojiao: 2 } },
      { key: 'E', text: '脑子里全是最坏的想象，坐立难安。', scores: { bingjiao: 2 } },
    ],
  },
  {
    id: 'Q502', module: 5, type: 'scenario',
    text: '对伴侣的手机和社交隐私，你的态度是？',
    options: [
      { key: 'A', text: '各有隐私，完全尊重。', scores: { qingxing: 2, fuli: 1 } },
      { key: 'B', text: '坦诚就好，不必刻意查看。', scores: { natural: 1 } },
      { key: 'C', text: '偶尔忍不住好奇想看。', scores: { dilei: 1 } },
      { key: 'D', text: '很介意有秘密，希望彼此透明。', scores: { bingjiao: 2 } },
    ],
  },
  {
    id: 'Q503', module: 5, type: 'scenario',
    text: '对伴侣拥有独立的兴趣和社交圈，你怎么看？',
    options: [
      { key: 'A', text: '很支持，各自精彩更好。', scores: { fuli: 2, qingxing: 1 } },
      { key: 'B', text: '支持，偶尔希望也带上我。', scores: { natural: 1 } },
      { key: 'C', text: '支持，但会有点小吃醋。', scores: { aojiao: 1, dilei: 1 } },
      { key: 'D', text: '希望重心还是放在我们的关系上。', scores: { bingjiao: 1, zhongli: 1 } },
    ],
  },
  {
    id: 'Q504', module: 5, type: 'scenario',
    text: '不满对方某个行为时，你更可能？',
    options: [
      { key: 'A', text: '直接提出来，一起商量边界。', scores: { natural: 2, qingxing: 1 } },
      { key: 'B', text: '找合适时机委婉说。', scores: { aojiao: 1 } },
      { key: 'C', text: '用冷淡或别扭让对方意识到。', scores: { aojiao: 2, yujiao: 1 } },
      { key: 'D', text: '当下就直接发作，藏不住。', scores: { baojiao: 2, dilei: 1 } },
    ],
  },
  {
    id: 'Q505', module: 5, type: 'scenario',
    text: '你理想中「健康的在乎」应该是？',
    options: [
      { key: 'A', text: '在乎但不干涉，信任是底色。', scores: { qingxing: 2 } },
      { key: 'B', text: '可以提需求，但要双方协商。', scores: { natural: 1, zhongli: 1 } },
      { key: 'C', text: '适度的独占是爱的证明。', scores: { zhongli: 1, bingjiao: 1 } },
      { key: 'D', text: '希望对方的世界里我占很大比重。', scores: { bingjiao: 2 } },
    ],
  },
  {
    id: 'Q506', module: 5, type: 'scenario',
    text: '当你和伴侣就「边界」产生分歧，你更看重？',
    options: [
      { key: 'A', text: '找到双方都舒服的平衡点。', scores: { qingxing: 2 } },
      { key: 'B', text: '把我的底线讲清楚。', scores: { natural: 1, aoman: 1 } },
      { key: 'C', text: '希望对方多体谅我的不安。', scores: { dilei: 1, yujiao: 1 } },
      { key: 'D', text: '不太想妥协，按我觉得对的来。', scores: { aoman: 2 } },
    ],
  },
  {
    id: 'Q507', module: 5, type: 'scenario',
    text: '伴侣当众说了句让你没面子的玩笑，你会？',
    options: [
      { key: 'A', text: '一笑而过，私下再说。', scores: { qingfu: 1, qingxing: 1 } },
      { key: 'B', text: '当场沉下脸，气氛瞬间凝固。', scores: { aoman: 2 } },
      { key: 'C', text: '忍不住当场就怼回去。', scores: { baojiao: 2 } },
      { key: 'D', text: '表面没事，心里记很久。', scores: { yujiao: 1, aojiao: 1 } },
    ],
  },
  {
    id: 'Q508', module: 5, type: 'scenario',
    text: '当你强烈地怕失去对方时，最像你的反应是？',
    options: [
      { key: 'A', text: '想掌握TA的行踪，查岗、不许TA和别人太近，总觉得是别人的错。', scores: { bingjiao: 3 } },
      { key: 'B', text: '当场情绪就爆了，夺命连环问"你是不是不爱我了"。', scores: { dilei: 3 } },
      { key: 'C', text: '把失落全咽下去，默默为TA付出更多，用"我都是为你"把人留住。', scores: { zhongli: 3 } },
      { key: 'D', text: '觉得一定是我不够好，拼命讨好、把错全揽到自己身上。', scores: { yujiao: 3 } },
      { key: 'E', text: '火一下上来又很快软下去，凶完就后悔、主动哄回来。', scores: { baojiao: 3 } },
    ],
  },
  {
    id: 'Q509', module: 5, type: 'scenario',
    text: '你表达"我很爱你"的方式，最接近哪一种？',
    options: [
      { key: 'A', text: '把普通小事许诺成一辈子："今天陪我这几小时，够我回味一辈子了。"', scores: { zhongli: 3 } },
      { key: 'B', text: '"你去忙吧别管我"——嘴上体贴，其实想让TA感到亏欠。', scores: { zhongli: 2, yujiao: 1 } },
      { key: 'C', text: '"是我配不上你"——把对方捧成唯一的救赎，自己卑微到尘埃。', scores: { yujiao: 3 } },
      { key: 'D', text: '想把TA牢牢锁在身边，只属于我一个人。', scores: { bingjiao: 3 } },
    ],
  },

  // ============ 模块 6：冲突、爆发与修复 ============
  {
    id: 'Q601', module: 6, type: 'scenario',
    text: '争吵刚开始上头时，你的第一反应是？',
    options: [
      { key: 'A', text: '尽量就事论事，控制情绪。', scores: { qingxing: 2 } },
      { key: 'B', text: '需要先停一下，冷静再说。', scores: { sanwu: 1, qingxing: 1 } },
      { key: 'C', text: '容易被情绪带着，说话变冲。', scores: { baojiao: 2 } },
      { key: 'D', text: '情绪瞬间失控，可能突然爆发或摔门。', scores: { dilei: 2, baojiao: 1 } },
    ],
  },
  {
    id: 'Q602', module: 6, type: 'scenario',
    text: '争吵时你说了伤人的话，冷静后最可能？',
    options: [
      { key: 'A', text: '主动道歉，承担自己那部分。', scores: { natural: 2, zhongli: 1 } },
      { key: 'B', text: '等对方先来联系。', scores: { aoman: 2 } },
      { key: 'C', text: '假装这事过去了，不再提。', scores: { sanwu: 1, fuli: 1 } },
      { key: 'D', text: '很懊悔自己的冲动，又拉不下脸。', scores: { dilei: 1, canian: 1, yujiao: 1 } },
    ],
  },
  {
    id: 'Q603', module: 6, type: 'frequency',
    text: '情绪很激烈时，你多容易做出冲动的事（说狠话、提分手、摔东西）？',
    options: [
      { key: 'A', text: '几乎不会，再气也有刹车。', scores: { qingxing: 2 } },
      { key: 'B', text: '偶尔会，但很快后悔。', scores: { dilei: 1, yujiao: 1 } },
      { key: 'C', text: '比较容易，上头就突然控制不住。', scores: { dilei: 2 } },
      { key: 'D', text: '很容易，我表达一向就激烈。', scores: { baojiao: 2 } },
    ],
  },
  {
    id: 'Q604', module: 6, type: 'scenario',
    text: '冲突后进入冷战，你更可能是？',
    options: [
      { key: 'A', text: '受不了冷战，会主动打破僵局。', scores: { natural: 2 } },
      { key: 'B', text: '冷静几天后主动沟通。', scores: { qingxing: 2 } },
      { key: 'C', text: '谁先低头看谁，我偏倔。', scores: { aoman: 2 } },
      { key: 'D', text: '表面平静，内心煎熬到快炸。', scores: { yujiao: 1, dilei: 1 } },
    ],
  },
  {
    id: 'Q605', module: 6, type: 'scenario',
    text: '对方情绪爆发时，你的应对更接近？',
    options: [
      { key: 'A', text: '先稳住自己，陪对方把情绪过去。', scores: { qingxing: 1, natural: 1 } },
      { key: 'B', text: '容易被点燃，针锋相对。', scores: { baojiao: 2, dilei: 1 } },
      { key: 'C', text: '手足无措，不知怎么接。', scores: { canian: 2 } },
      { key: 'D', text: '选择沉默回避，等风头过去。', scores: { sanwu: 1, fuli: 1 } },
    ],
  },
  {
    id: 'Q606', module: 6, type: 'scenario',
    text: '想和好但拉不下脸时，你一般怎么迈第一步？',
    options: [
      { key: 'A', text: '直接说「我们别冷战了，聊聊」。', scores: { natural: 2 } },
      { key: 'B', text: '用一个小动作示好（买吃的、发表情）。', scores: { aojiao: 2 } },
      { key: 'C', text: '假装刚才没发生，正常说话。', scores: { sanwu: 1, fuli: 1 } },
      { key: 'D', text: '很想和好，却常卡住什么都没做。', scores: { canian: 2 } },
    ],
  },
  {
    id: 'Q607', module: 6, type: 'frequency',
    text: '吵架时你多容易把过去的旧账一起翻出来？',
    options: [
      { key: 'A', text: '几乎不会，只谈当下。', scores: { qingxing: 2 } },
      { key: 'B', text: '偶尔会带出来一点。', scores: { natural: 1 } },
      { key: 'C', text: '比较容易，积压的委屈会一起涌。', scores: { yujiao: 2, dilei: 1 } },
      { key: 'D', text: '很容易，一激动旧伤全炸出来。', scores: { dilei: 2, baojiao: 1 } },
    ],
  },

  // ============ 模块 7：付出、承诺与投入 ============
  {
    id: 'Q701', module: 7, type: 'scenario',
    text: '一段关系里，你投入感情的速度通常？',
    options: [
      { key: 'A', text: '很快，喜欢就全情投入。', scores: { zhongli: 2, bingjiao: 1 } },
      { key: 'B', text: '中等，边相处边加深。', scores: { natural: 1 } },
      { key: 'C', text: '偏慢，需要时间建立信任。', scores: { sanwu: 1, qingxing: 1 } },
      { key: 'D', text: '很克制，先保护好自己。', scores: { fuli: 2, qingxing: 1 } },
    ],
  },
  {
    id: 'Q702', module: 7, type: 'scenario',
    text: '你发现最近总是自己发起聊天和约会，对方很少主动。你会？',
    options: [
      { key: 'A', text: '坦诚沟通我的感受和需求。', scores: { natural: 2 } },
      { key: 'B', text: '降低投入，观察对方反应。', scores: { qingxing: 1, aoman: 1 } },
      { key: 'C', text: '继续主动，但心里累积委屈。', scores: { zhongli: 1, yujiao: 1 } },
      { key: 'D', text: '觉得不被对等对待，情绪容易崩。', scores: { dilei: 2 } },
    ],
  },
  {
    id: 'Q703', module: 7, type: 'frequency',
    text: '关系中你多容易为对方忽略自己的需求？',
    options: [
      { key: 'A', text: '几乎不会，我很清楚自己要什么。', scores: { qingxing: 2 } },
      { key: 'B', text: '偶尔，但会及时调整。', scores: { natural: 1 } },
      { key: 'C', text: '比较容易，习惯先顾对方。', scores: { zhongli: 1, yujiao: 1 } },
      { key: 'D', text: '经常，委屈自己也要成全。', scores: { zhongli: 1, bingjiao: 1, yujiao: 1 } },
    ],
  },
  {
    id: 'Q704', module: 7, type: 'scenario',
    text: '你心中的「忠诚」更接近？',
    options: [
      { key: 'A', text: '身心专一，认定就不动摇。', scores: { zhongli: 2 } },
      { key: 'B', text: '坦诚为先，有问题摊开说。', scores: { natural: 1, qingxing: 1 } },
      { key: 'C', text: '在一起时真心，但不勉强永远。', scores: { qingfu: 1, fuli: 1 } },
      { key: 'D', text: '很重，背叛是我绝对的底线。', scores: { zhongli: 2, dilei: 1 } },
    ],
  },
  {
    id: 'Q705', module: 7, type: 'scenario',
    text: '关系稳定下来后，你的投入会怎么变化？',
    options: [
      { key: 'A', text: '更踏实，愿意长期经营。', scores: { zhongli: 2 } },
      { key: 'B', text: '基本稳定，细水长流。', scores: { natural: 1 } },
      { key: 'C', text: '可能变平淡，需要新鲜感维持。', scores: { qingfu: 2 } },
      { key: 'D', text: '会留意彼此是否还同频成长。', scores: { dianbo: 2, qingxing: 1 } },
    ],
  },
  {
    id: 'Q706', module: 7, type: 'counterfactual',
    text: '假如这段关系注定没有未来，你还会全心投入当下吗？',
    options: [
      { key: 'A', text: '不会，没有未来我很难投入。', scores: { zhongli: 2 } },
      { key: 'B', text: '会收着点，保护自己。', scores: { qingxing: 1, fuli: 1 } },
      { key: 'C', text: '会，珍惜当下的真心就好。', scores: { qingfu: 1, natural: 1 } },
      { key: 'D', text: '明知如此还是会深陷进去。', scores: { bingjiao: 2, dilei: 1 } },
    ],
  },
  {
    id: 'Q707', module: 7, type: 'scenario',
    text: '对「长期承诺」（同居、未来规划），你的态度是？',
    options: [
      { key: 'A', text: '向往，愿意认真规划未来。', scores: { zhongli: 2 } },
      { key: 'B', text: '顺其自然，到了阶段再说。', scores: { natural: 1, qingfu: 1 } },
      { key: 'C', text: '有点怕被绑住，需要空间。', scores: { fuli: 2 } },
      { key: 'D', text: '渴望但也害怕，怕期待落空。', scores: { yujiao: 1, dilei: 1 } },
    ],
  },
  {
    id: 'Q708', module: 7, type: 'frequency',
    text: '你多容易为了不让对方为难，而默默压下自己的委屈、硬扛着？',
    options: [
      { key: 'A', text: '几乎不会，有委屈我会直接说。', scores: { natural: 2 } },
      { key: 'B', text: '偶尔，但不至于憋坏自己。', scores: { qingxing: 1 } },
      { key: 'C', text: '挺经常，宁可自己内耗也不想麻烦TA。', scores: { zhongli: 2, yujiao: 1 } },
      { key: 'D', text: '几乎总是，默默牺牲到感动自己、也压垮自己。', scores: { zhongli: 3, yujiao: 1 } },
    ],
  },

  // ============ 模块 8：新鲜感、自由与节奏 ============
  {
    id: 'Q801', module: 8, type: 'frequency',
    text: '恋爱中你多需要属于自己的独处时间？',
    options: [
      { key: 'A', text: '非常需要，没有会窒息。', scores: { fuli: 2, qingxing: 1 } },
      { key: 'B', text: '需要一些，但不多。', scores: { qingxing: 1 } },
      { key: 'C', text: '不太需要，更喜欢待一起。', scores: { zhongli: 1 } },
      { key: 'D', text: '几乎不需要，黏在一起最安心。', scores: { zhongli: 1, dilei: 1 } },
    ],
  },
  {
    id: 'Q802', module: 8, type: 'scenario',
    text: '关系进入平淡期时，你更可能？',
    options: [
      { key: 'A', text: '享受这种踏实安稳。', scores: { zhongli: 2 } },
      { key: 'B', text: '主动制造点新鲜和惊喜。', scores: { qingfu: 2 } },
      { key: 'C', text: '有点无聊，开始想要变化。', scores: { qingfu: 2, fuli: 1 } },
      { key: 'D', text: '担心是不是感情变淡了。', scores: { dilei: 1, yujiao: 1 } },
    ],
  },
  {
    id: 'Q803', module: 8, type: 'scenario',
    text: '对「固定模式的约会」（总去老地方），你的感觉是？',
    options: [
      { key: 'A', text: '很好，熟悉让我安心。', scores: { zhongli: 1, natural: 1 } },
      { key: 'B', text: '可以，但偶尔想换花样。', scores: { qingfu: 1 } },
      { key: 'C', text: '会腻，喜欢不断尝新。', scores: { qingfu: 2, fuli: 1 } },
      { key: 'D', text: '更在意和谁一起，去哪无所谓。', scores: { dianbo: 1, natural: 1 } },
    ],
  },
  {
    id: 'Q804', module: 8, type: 'scenario',
    text: '当关系靠得很近、对方想要更深捆绑时，你会？',
    options: [
      { key: 'A', text: '顺势靠近，乐意更紧密。', scores: { zhongli: 2 } },
      { key: 'B', text: '开心，但想保留一点自我空间。', scores: { fuli: 1, qingxing: 1 } },
      { key: 'C', text: '会不自觉想往后退一点。', scores: { fuli: 2 } },
      { key: 'D', text: '既渴望又害怕，很矛盾。', scores: { fancha: 2, yujiao: 1 } },
    ],
  },
  {
    id: 'Q805', module: 8, type: 'frequency',
    text: '你多看重和伴侣「聊得深、精神同频」？',
    options: [
      { key: 'A', text: '极其看重，聊不来是硬伤。', scores: { dianbo: 2 } },
      { key: 'B', text: '看重，但也要生活合拍。', scores: { dianbo: 1, zhongli: 1 } },
      { key: 'C', text: '一般，开心轻松更重要。', scores: { qingfu: 2 } },
      { key: 'D', text: '陪伴踏实比聊天深度更重要。', scores: { natural: 1, zhongli: 1 } },
    ],
  },
  {
    id: 'Q806', module: 8, type: 'scenario',
    text: '你更喜欢关系怎样「确定下来」？',
    options: [
      { key: 'A', text: '尽快明确，别暧昧不清。', scores: { zhongli: 2 } },
      { key: 'B', text: '自然发展，水到渠成。', scores: { natural: 1, fuli: 1 } },
      { key: 'C', text: '享受暧昧过程，不急。', scores: { qingfu: 2 } },
      { key: 'D', text: '确认前反复观察对方是否认真。', scores: { qingxing: 1, dilei: 1 } },
    ],
  },
  {
    id: 'Q807', module: 8, type: 'scenario',
    text: '你和喜欢的人聊天时，最享受哪一刻？',
    options: [
      { key: 'A', text: '抛梗接梗、笑到停不下来。', scores: { qingfu: 2 } },
      { key: 'B', text: '聊到某个只有彼此懂的点，瞬间同频。', scores: { dianbo: 2 } },
      { key: 'C', text: '安静待着也不尴尬的踏实。', scores: { zhongli: 1, sanwu: 1 } },
      { key: 'D', text: '对方被我笨拙的用心逗笑的时候。', scores: { canian: 2 } },
    ],
  },

  // ============ 模块 9：隐藏需求与反差 ============
  {
    id: 'Q901', module: 9, type: 'self',
    consistencyGroup: 'indep-01', compareRole: 'self', compareDim: 'fuli',
    contrastSelf: '你通常觉得自己独立、不需要别人频繁关心',
    contrastActual: '遇到重要困难时，你其实很希望伴侣主动察觉并出现',
    text: '平时你觉得自己需要别人关心的程度？',
    options: [
      { key: 'A', text: '不太需要，自己能搞定。', scores: { fuli: 2 } },
      { key: 'B', text: '适度就好。', scores: { qingxing: 1 } },
      { key: 'C', text: '还挺需要被惦记的。', scores: { zhongli: 1 } },
      { key: 'D', text: '很需要，被忽略会难受。', scores: { dilei: 1, yujiao: 1 } },
    ],
  },
  {
    id: 'Q902', module: 9, type: 'actual',
    consistencyGroup: 'indep-01', compareRole: 'actual', compareDim: 'fuli',
    text: '你遇到一个很重要的难关，最希望伴侣怎么做？',
    options: [
      { key: 'A', text: '给我空间，等我自己开口。', scores: { fuli: 2 } },
      { key: 'B', text: '先问我需不需要帮忙，再介入。', scores: { natural: 1, qingxing: 1 } },
      { key: 'C', text: '安静陪着，不追问。', scores: { sanwu: 1, zhongli: 1 } },
      { key: 'D', text: '主动察觉并出现在我身边。', scores: { yujiao: 1, dilei: 1 } },
    ],
  },
  {
    id: 'Q903', module: 9, type: 'scenario',
    text: '下面哪种「反差」最像你？',
    options: [
      { key: 'A', text: '表面不在意，其实特别在意。', scores: { fancha: 2, aojiao: 1 } },
      { key: 'B', text: '表面独立，其实渴望被照顾。', scores: { fancha: 2, yujiao: 1 } },
      { key: 'C', text: '表面理性，其实很容易被情绪牵动。', scores: { fancha: 2, dilei: 1 } },
      { key: 'D', text: '没什么反差，我比较表里如一。', scores: { natural: 2 } },
    ],
  },
  {
    id: 'Q904', module: 9, type: 'scenario',
    text: '熟悉之后，你和刚认识时相比，变化是？',
    options: [
      { key: 'A', text: '从高冷变得很黏、很爱闹。', scores: { fancha: 2 } },
      { key: 'B', text: '从活泼变得安静专注。', scores: { fancha: 1, dianbo: 1 } },
      { key: 'C', text: '基本没变，一直这样。', scores: { natural: 1, sanwu: 1 } },
      { key: 'D', text: '越熟越容易闹情绪、使小性子。', scores: { dilei: 1, aojiao: 1 } },
    ],
  },
  {
    id: 'Q905', module: 9, type: 'scenario',
    text: '你内心最不愿被人看到的一面是？',
    options: [
      { key: 'A', text: '其实很怕被丢下、情绪很不稳。', scores: { dilei: 2 } },
      { key: 'B', text: '偶尔的阴郁和别扭。', scores: { yujiao: 2 } },
      { key: 'C', text: '笨拙、不知所措的时刻。', scores: { canian: 2 } },
      { key: 'D', text: '没什么特别不想被看到的。', scores: { natural: 1, qingxing: 1 } },
    ],
  },
  {
    id: 'Q906', module: 9, type: 'scenario',
    text: '你嘴上说「不用特意关心我」，心里真正期待的是？',
    options: [
      { key: 'A', text: '对方能不顾我的嘴硬，主动来关心。', scores: { aojiao: 2, yujiao: 1 } },
      { key: 'B', text: '真的不用，我说的是真心话。', scores: { fuli: 1, sanwu: 1 } },
      { key: 'C', text: '至少被问一句，就够了。', scores: { yujiao: 1, dilei: 1 } },
      { key: 'D', text: '被默默记在心上，不用说破。', scores: { dianbo: 2 } },
    ],
  },
  {
    id: 'Q907', module: 9, type: 'scenario',
    text: '你希望有个人能「看穿」你的哪一层？',
    options: [
      { key: 'A', text: '看穿我逞强背后的疲惫。', scores: { aoman: 1, yujiao: 1, fancha: 1 } },
      { key: 'B', text: '看穿我沉默里藏的深情。', scores: { sanwu: 1, dianbo: 1 } },
      { key: 'C', text: '看穿我故作轻松下的认真。', scores: { fancha: 1, qingfu: 1, zhongli: 1 } },
      { key: 'D', text: '不需要被看穿，我会自己说。', scores: { natural: 2 } },
    ],
  },

  // ============ 模块 10：理想关系与需求 ============
  {
    id: 'Q1001', module: 10, type: 'scenario',
    text: '你最希望伴侣用什么方式表达喜欢？',
    options: [
      { key: 'A', text: '直接说出来，明确又频繁。', scores: { natural: 2 } },
      { key: 'B', text: '用稳定的行动和陪伴。', scores: { zhongli: 2 } },
      { key: 'C', text: '用有趣的互动和小惊喜。', scores: { qingfu: 2 } },
      { key: 'D', text: '用懂我的默契和精神共鸣。', scores: { dianbo: 2 } },
    ],
  },
  {
    id: 'Q1002', module: 10, type: 'scenario',
    text: '你希望伴侣在你情绪低落时？',
    options: [
      { key: 'A', text: '主动察觉，第一时间来陪我。', scores: { dilei: 1, yujiao: 1 } },
      { key: 'B', text: '安静陪着，给我稳稳的支撑。', scores: { zhongli: 1, sanwu: 1 } },
      { key: 'C', text: '陪我做点开心事转移注意力。', scores: { qingfu: 2 } },
      { key: 'D', text: '尊重我，等我想说时再听。', scores: { fuli: 1, qingxing: 1 } },
    ],
  },
  {
    id: 'Q1003', module: 10, type: 'scenario',
    text: '你希望争吵时对方怎么做？',
    options: [
      { key: 'A', text: '愿意先冷静，再好好沟通。', scores: { qingxing: 2 } },
      { key: 'B', text: '主动哄我、给我台阶。', scores: { aojiao: 1, dilei: 1 } },
      { key: 'C', text: '直接把话讲开，别冷战。', scores: { natural: 2 } },
      { key: 'D', text: '给彼此一点空间再和好。', scores: { fuli: 2 } },
    ],
  },
  {
    id: 'Q1004', module: 10, type: 'scenario',
    text: '关于「空间」，你对理想伴侣的期待是？',
    options: [
      { key: 'A', text: '尊重我的独处，不黏不查。', scores: { fuli: 2, qingxing: 1 } },
      { key: 'B', text: '多陪陪我，别总各忙各的。', scores: { zhongli: 1, dilei: 1 } },
      { key: 'C', text: '张弛有度，该腻腻该独立独立。', scores: { natural: 1, qingfu: 1 } },
      { key: 'D', text: '希望大部分时间都在一起。', scores: { zhongli: 1, bingjiao: 1 } },
    ],
  },
  {
    id: 'Q1005', module: 10, type: 'scenario',
    text: '关系中你最不可接受的是？',
    options: [
      { key: 'A', text: '欺骗和不忠。', scores: { zhongli: 2 } },
      { key: 'B', text: '被忽视、感受不到在乎。', scores: { dilei: 2, yujiao: 1 } },
      { key: 'C', text: '被控制、失去自由。', scores: { fuli: 2, qingxing: 1 } },
      { key: 'D', text: '无话可说、精神不同频。', scores: { dianbo: 2 } },
    ],
  },
  {
    id: 'Q1006', module: 10, type: 'scenario',
    text: '如果用一句话描述你最想要的关系，更接近？',
    options: [
      { key: 'A', text: '细水长流、认定一生的踏实。', scores: { zhongli: 2 } },
      { key: 'B', text: '永远新鲜、永远心动的热恋感。', scores: { qingfu: 2 } },
      { key: 'C', text: '灵魂契合、彼此懂得的共鸣。', scores: { dianbo: 2 } },
      { key: 'D', text: '自由又亲密、各自完整的两个人。', scores: { fuli: 2, qingxing: 1 } },
    ],
  },
  {
    id: 'Q1007', module: 10, type: 'scenario',
    text: '你最希望被伴侣「接住」的，是你的哪一面？',
    options: [
      { key: 'A', text: '我偶尔突然涌起、难以自控的情绪。', scores: { dilei: 2 } },
      { key: 'B', text: '我藏在平静下的低落和别扭。', scores: { yujiao: 2 } },
      { key: 'C', text: '我笨拙却认真的用心。', scores: { canian: 2 } },
      { key: 'D', text: '我嘴硬心软的那点别扭。', scores: { aojiao: 2 } },
    ],
  },

  // ============ 倾向自评题（Likert 五级：这是我 / 有时是我 / 中立 / 有时不是我 / 不是我）============
  // 用 likert() 生成：陈述命中某维，赞同度越高给该维分越高（+2/+1/0/-1/-2）。
  ...[
    ['L01', 10, '我总忍不住把当下的小事许诺成一辈子（"今天这几小时够我回味一生"）。', 'zhongli'],
    ['L02', 10, '怕失去对方时，我会把失落默默咽下，宁可自己内耗也不想麻烦TA。', 'zhongli'],
    ['L03', 10, '一旦没安全感，我会想掌握对方的行踪、不许TA和别人太近。', 'bingjiao'],
    ['L04', 10, '关系出问题，我的第一反应是"是不是我不够好"，然后拼命讨好。', 'yujiao'],
    ['L05', 10, '我的情绪像过山车，一个冷淡的瞬间就可能突然引爆。', 'dilei'],
    ['L06', 10, '我一被惹到就当场炸毛，但凶完很快就后悔、主动服软。', 'baojiao'],
    ['L07', 10, '明明很在乎，我却偏偏嘴硬、死不承认。', 'aojiao'],
    ['L08', 10, '我表面没什么表情，心里其实什么都在意。', 'sanwu'],
    ['L09', 10, '被人喜欢上了我常常浑然不觉，暗示我基本接不到。', 'natural'],
    ['L10', 10, '我情话张口就来，暧昧的分寸拿捏得很好。', 'qingfu'],
    ['L11', 10, '我像水——你温柔捧着我可以，但一攥紧我就从指缝溜走。', 'fuli'],
    ['L12', 10, '我活在自己的频率里，常冒出让别人跟不上的脑回路。', 'dianbo'],
    ['L13', 10, '再上头我也能抽离出来分析，不太会被氛围冲昏头。', 'qingxing'],
    ['L14', 10, '我很难先低头认错，有时甚至懒得跟对方争辩。', 'aoman'],
    ['L15', 10, '我其实有闪光点，却总在关键时刻掉链子、让人觉得可惜。', 'canian'],
    ['L16', 10, '熟了之后，我和刚认识时简直判若两人。', 'fancha'],
  ].map(([id, module, text, dim]) => ({
    id, module, type: 'likert', text,
    options: [
      { key: 'A', text: '这是我', scores: { [dim]: 2 } },
      { key: 'B', text: '有时是我', scores: { [dim]: 1 } },
      { key: 'C', text: '中立', scores: { [dim]: 0 } },
      { key: 'D', text: '有时不是我', scores: { [dim]: -1 } },
      { key: 'E', text: '不是我', scores: { [dim]: -2 } },
    ],
  })),

  // 题库结束
];
