# Meeting Notes Assistant PRD

## 📋 Overview

**Goal:** 帮助用户快速整理和结构化会议记录，自动提取关键信息、待办事项和决策点

**Why now:** 每次开完会后都要花大量时间整理笔记，经常遗漏重要信息，需要一个工具自动化这个过程

---

## 👥 Target User

| Aspect | Description |
|--------|-------------|
| **Who** | 产品经理、项目管理者、会议参与者 |
| **Context** | 在会议室或远程会议后，需要快速整理会议记录 |
| **Skill Level** | 非技术用户为主，需要简单的操作界面 |
| **Current Pain** | 手动整理笔记耗时，容易遗漏行动项，决策记录不清晰 |

**Before & After Scenario:**

> Before: 开会时手写笔记，会后花30-60分钟整理成文档，经常想不起"谁说的那个决定是什么"，待办事项分散在各处
>
> After: 会议结束上传录音或粗略笔记，AI 自动提取：会议纪要、待办事项（谁/做什么/截止时间）、决策记录，1分钟搞定

---

## 🚀 Core Features (MVP)

| Priority | Feature | Description | User Action |
|----------|---------|-------------|-------------|
| P0 | 自动提取关键信息 | 从会议文本中提取：议题、讨论内容、决策、待办事项 | 输入/粘贴文本 → 输出结构化摘要 |
| P0 | 待办事项分配 | 为每个待办事项标记负责人、截止时间、优先级 | 文本识别 → AI 识别 → 用户确认 |
| P1 | 决策记录追踪 | 提取并高亮关键决策，支持按时间线回溯 | 文本识别 → AI 提取决策 |

**Out of Scope (v1):**
- 不做实时转录（需要上传文本或录音）
- 不做多语言支持（先专注中文）
- 不做团队协作功能
- 不做数据分析或洞察

---

## ⚙️ Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| **Performance** | 5页以内会议文本在5秒内处理完成 |
| **Data/Privacy** | 用户数据仅本地处理，不上传任何敏感信息 |
| **Platform** | Web 应用（优先）/ Chrome 扩展（可选） |
| **Scale** | 单用户场景，无需多租户 |

---

## 🛠️ Tech Stack Suggestions

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Frontend** | React + Tailwind CSS | 快速开发，样式清晰，组件复用方便 |
| **Backend** | Python/FastAPI | AI 处理用 Python，FastAPI 轻量高效 |
| **AI/LLM** | Claude API (claude-3-5-sonnet) | 文本理解能力强，输出稳定，性价比高 |
| **State** | 本地 LocalStorage | 单用户无需后端存储，降低复杂度 |
| **Hosting** | Vercel (前端) + 本地运行后端 | Vercel 免费额度够用，后端本地更隐私 |

---

## 🎯 Success Criteria

- [ ] 用户能在5分钟内完成一次会议笔记整理
- [ ] 待办事项提取准确率 > 90%
- [ ] 决策记录提取准确率 > 85%
- [ ] 用户愿意每周使用至少2次

---

## 📝 Notes for AI

这是一个内容提取和结构化的任务，不是创作任务。关键是：
- 准确识别：谁说了什么（发言人）
- 清晰分类：讨论、决策、待办
- 保持客观：不添加AI自己的判断或建议
- 结构化输出：方便用户后续使用

---

*Generated with AI PM PRD Skill*
