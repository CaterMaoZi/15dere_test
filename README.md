# 15dere_test · 十五维恋爱属性测试

> 你是哪一系？一个纯本地运行、无后端的娱乐向恋爱自我探索测试。答完约 90 道题，生成你在 **15 个恋爱属性维度**上的雷达图 + 从高到低的排行分析 + 突出维度详解。

🔗 **在线体验**：https://acg.mcres.cn/15test/

> ⚠️ 仅供娱乐与自我探索。这**不是**心理诊断，也**不是**经心理测量学验证的人格量表，不能预测恋爱成功率。

## 15 维属性

天然 · 轻浮 · 电波 · 地雷 · 重力 · 浮力 · 三无 · 傲娇 · 暴娇 · 病娇 · 反差 · 清醒 · 傲慢 · 残念 · 郁娇

维度源自日系 ACGN 角色属性与 J-fashion 亚文化，并参考小红书等中文社区的流行用法校正了每一维的"极端面"与彼此区分（见 `docs/参考文献.md`）。最易混的 5 个"深情焦虑"维用「**怕失去 × 向内/向外**」区分：病娇=向外占有、地雷=向外爆雷、暴娇=炸毛又心软、重力=向内沉重的精神内耗、郁娇=向内自责讨好。

## 快速开始

### 方式一：直接双击打开
双击 `index.html`。部分浏览器对 `file://` 下的 ES Module 有限制，若空白请用方式二。

### 方式二：本地静态服务（推荐，无需安装依赖）
```bash
# Node
node -e "const h=require('http'),f=require('fs'),p=require('path'),t={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8'};h.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';f.readFile(p.join(process.cwd(),u),(e,d)=>{if(e){r.writeHead(404);return r.end('404')}r.writeHead(200,{'Content-Type':t[p.extname(u)]||'application/octet-stream'});r.end(d)})}).listen(8099,()=>console.log('http://localhost:8099'))"

# 或 Python
python -m http.server 8099
```
访问 **http://localhost:8099** 。

### 使用流程
首页 →「开始测试」→ 逐题作答（选完自动进入下一题，可随时上一题修改）→ 查看结果 →
结果报告（15 维雷达图 + 降序排行 + 分析板块）→ 属性图鉴。进度自动存在浏览器本地，可从首页「继续上次」。

## 项目结构

```
├─ index.html / test.html / result.html / codex.html / author.html
├─ css/            base.css components.css pages.css
├─ js/
│  ├─ data/        dimensions(15维定义+文案) / questions(题库) / matching / results-copy
│  ├─ core/        keys / storage / scoring(评分) / render(雷达+排行+板块)
│  ├─ pages/       test / result / codex
│  └─ selftest.js  八画像自测
├─ docs/           设计说明.md / 参考文献.md
├─ LICENSE         CC BY-NC 4.0
└─ README.md
```

题库、维度定义、评分逻辑、结果文案分离管理，详见 `docs/设计说明.md`。

## 功能清单

- ✅ 约 90 道题，10 模块，题型多样（含倾向自评 Likert 题）；15 维每维 ≥9 道题覆盖
- ✅ 扁平的 15 维综合体系（源自日系 ACGN/J-fashion，并经小红书语料校正极端面与区分）
- ✅ 动态评分：15 维归一化、降序排行、突出维、自我认知反差、隐藏需求、低确定性
- ✅ 结果页 15 维雷达图（内联 SVG）+ 从高到低排行条 + 多板块分析
- ✅ 本地保存进度、刷新恢复、上/下题、改答案、重测
- ✅ 响应式，手机端可用；零外部运行时依赖

## 自测

```bash
node js/selftest.js
```
构造八种模拟画像断言：八种不同最突出维（区分度足够）、各画像方向正确、
「怕失去 × 向内/向外」区分成立（重力向内 vs 病娇向外、郁娇自责 vs 地雷爆雷）、
地雷画像显著区别于新鲜画像、反差可识别。

## 技术

原生 HTML + CSS + JavaScript（ES Module），无框架、无构建、无后端、无第三方运行时依赖。

## 开发说明

关于 15 维体系的设计、评分规则、维度来源核实与小红书语料校正、避免偏差的措施，详见：
- [`docs/设计说明.md`](docs/设计说明.md) — 维度体系、题库结构、评分规则（与代码一致）
- [`docs/参考文献.md`](docs/参考文献.md) — ACGN/J-fashion 术语来源与中文社区用法说明

## 已知局限

- 本测试是娱乐分类，未做信度/效度检验；结果是「本测试内部的相对倾向」，非真实人格概率或恋爱预测。
- 属性源自 ACGN/亚文化流行文化概念，不是人格科学。
- 评分依赖自我报告，受社会赞许等反应偏差影响；已通过「选项代表不同策略 + 自评↔实际对照题」缓解。
- 对病娇/暴娇/地雷等标签刻画的是人格原型的性格谱系，与现实中的监控、胁迫、自伤或伤害行为是两回事；真实关系里占有不等于爱。

## 作者与许可证

- 作者：**Reruna**
- 许可证：**[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)**（署名 — 非商业）

你可以自由分享与改编本项目，但须**署名 Reruna**、注明改动，且**不得用于商业用途**。详见 [`LICENSE`](LICENSE)。
