# 🌿 CalmMate - AI 情绪疗愈助手

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3.10-ff69b4?style=for-the-badge&logo=bun)](https://bun.sh/)

**专注大学生焦虑疏导的AI疗愈助手**

[🚀 快速开始](#-quick-start) •
[✨ 核心功能](#-core-features) •
[🛠️ 技术栈](#-tech-stack) •
[📱 界面预览](#-ui-preview)

</div>

## 🎯 产品定位

CalmMate 是一款专为大学生设计的AI情绪疗愈助手，通过"情绪疏导+轻量行动"帮助用户建立正向情绪循环。产品基于以下核心洞察：

- 📚 **目标用户**: 20岁左右大学生，面临学业压力、社交焦虑、空虚感
- 💝 **核心价值**: 从"用户不问AI不答"进化到主动关怀的疗愈体验
- 🎨 **差异化**: 专注垂直细分，避免泛陪伴陷阱

## 🚀 快速开始

### 环境要求
- Bun 1.0+ (推荐) 或 Node.js 18+
- 现代浏览器支持

### 安装与运行

```bash
# 进入项目目录
cd calm-mate

# 使用 Bun 安装依赖 (推荐)
bun install

# 启动开发服务器
bun run dev

# 或使用 npm (备选)
npm install
npm run dev
```

### 访问应用

打开浏览器访问: [http://localhost:3000](http://localhost:3000)

## ✨ 核心功能

### 📝 极简情绪签到
- **3步快速签到**: 选择情绪 → 评估强度 → 描述情况
- **7种情绪类型**: 焦虑、压力大、难过、生气、平静、开心、兴奋
- **强度评估**: 1-10级滑块，精准量化情绪状态
- **AI共情回应**: 温暖、理解性的个性化反馈

### 💬 AI智能对话
- **情感分析**: 基于 Kimi API 的智能情绪理解
- **共情回应**: 温暖、真诚的对话体验
- **个性化建议**: 基于情绪状态的定制化行动推荐
- **对话记忆**: 完整的会话流程管理

### 🎯 微行动推荐
- **3种行动类型**:
  - 🧘‍♀️ **深呼吸练习** - 缓解焦虑紧张
  - 📝 **感恩记录** - 提升积极情绪
  - 🚶‍♀️ **轻量运动** - 释放压力能量
- **难度分级**: 简单、中等、困难三个级别
- **时间建议**: 3-10分钟不等的行动时长

### 📊 情绪轨迹可视化
- **7天趋势图**: 直观展示情绪变化曲线
- **统计分析**: 平均情绪分、连续签到天数、改善趋势
- **每日详情**: 详细的情绪记录和变化轨迹
- **智能洞察**: 自动生成的个性化建议和分析

## 🛠️ 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全开发
- **React 18** - 现代化UI组件
- **Redux Toolkit** - 状态管理

### UI/UX
- **CSS-in-JS** - 组件化样式
- **响应式设计** - 移动优先
- **设计系统** - 统一的视觉规范
- **Recharts** - 数据可视化

### 数据处理
- **本地存储** - localStorage 数据持久化
- **数据分析** - 情绪统计和趋势分析
- **AI集成** - Kimi API 情感分析

### 开发工具
- **Bun** - 极速JavaScript运行时
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

## 📱 界面预览

### 🏠 首页
温暖的主页设计，展示情绪概览和快速入口

### 📝 情绪签到
4步签到流程，简洁直观的用户体验

### 📊 情绪轨迹
美观的数据可视化，清晰展示情绪变化

## 🎨 设计特色

### 色彩系统
- **主色调**: 温暖的咖啡棕色 (#8B7355)
- **辅助色**: 雾霾蓝 (#7BA0B8)
- **背景色**: 温暖的米白色 (#FEFCF8)
- **情感色**: 7种情绪对应不同颜色

### 设计原则
- **极简主义**: 界面简洁，重点突出
- **温暖感**: 色彩和文案营造安全感
- **移动优先**: 完美适配手机使用
- **可访问性**: 清晰的对比度和字体

## 🔧 配置说明

### 环境变量
复制 `.env.example` 到 `.env.local` 并配置：

```env
# AI服务配置
KIMI_API_KEY=你的API密钥
KIMI_API_URL=https://api.moonshot.cn/v1

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=CalmMate
```

### 可选配置
```env
# Supabase配置（用于云端同步）
SUPABASE_URL=你的SupabaseURL
SUPABASE_ANON_KEY=你的Supabase密钥
```

## 📁 项目结构

```
calm-mate/
├── pages/              # Next.js页面路由
│   ├── index.tsx      # 首页
│   ├── check-in.tsx   # 情绪签到页
│   └── history.tsx    # 情绪轨迹页
├── components/         # React组件
│   └── Navigation.tsx # 底部导航
├── lib/               # 核心逻辑
│   ├── store.ts       # Redux状态管理
│   ├── api.ts         # API服务
│   ├── aiService.ts   # AI服务
│   └── storage.ts     # 存储服务
├── utils/             # 工具函数
│   └── emotionAnalytics.ts # 情绪分析
├── types/             # TypeScript类型定义
├── styles/            # 全局样式
└── public/            # 静态资源
```

## 🎯 MVP验证指标

### 产品健康度
- ✅ **次日留存率** > 40%
- ✅ **7日留存率** > 20%
- ✅ **用户满意度** > 4.0
- ✅ **平均使用时长** > 8分钟

### 业务健康度
- ✅ **付费转化率** > 5%
- ✅ **获客成本** < 15元
- ✅ **LTV/CAC** > 3倍
- ✅ **崩溃率** < 0.1%

## 🚀 部署指南

### Vercel部署（推荐）
1. 将代码推送到 GitHub 仓库
2. 登录 Vercel 并导入项目
3. 配置环境变量
4. 一键部署

### 传统部署
```bash
# 构建生产版本
bun run build

# 启动生产服务器
bun run start
```

## 📈 未来规划

### V1.1 版本
- [ ] 深度对话系统
- [ ] 复杂记忆功能
- [ ] 多维情绪标签
- [ ] 个性化推荐算法

### V2.0 版本
- [ ] 月度报告
- [ ] 匿名社区
- [ ] 危机干预
- [ ] 多语言支持

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！请确保：
1. 代码符合 TypeScript 规范
2. 新功能包含适当的测试
3. 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">

**CalmMate - 用心陪伴每一个情绪时刻** 💝

[立即体验](http://localhost:3000) • [查看演示](DEMO.md)

</div>
