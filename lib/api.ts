import axios from 'axios';

// AI API 配置
const AI_API_KEY = process.env.KIMI_API_KEY;
const AI_API_URL = process.env.KIMI_API_URL || 'https://api.moonshot.cn/v1';

// 创建 axios 实例
const aiClient = axios.create({
  baseURL: AI_API_URL,
  headers: {
    'Authorization': `Bearer ${AI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 模拟AI回应 - 用于测试和备用
const mockResponses = [
  "我理解你现在的感受。每个人都会有焦虑的时候，这很正常。让我们一起深呼吸，慢慢来。",
  "听起来你正在经历一些挑战。记住，你不是一个人在战斗，我在这里陪伴着你。",
  "你的感受很重要，也很真实。让我们一起找到适合你的方法来缓解这种不适。",
  "谢谢你愿意分享你的感受。这种开放和诚实的态度很勇敢。让我们看看能做些什么来帮助你。",
  "我听到了你的困扰。有时候把内心的想法说出来本身就是一种释放。你做得很好。"
];

// AI 对话服务
export const aiService = {
  // 发送消息给AI
  async sendMessage(message: string, context?: string): Promise<string> {
    try {
      // 首先尝试真实 API
      if (AI_API_KEY && AI_API_KEY !== 'sk-xxxxxxx') {
        const response = await aiClient.post('/chat/completions', {
          model: 'longcat-v1',
          messages: [
            {
              role: 'system',
              content: `你是一个专业的情绪疗愈助手，专门帮助大学生缓解焦虑和压力。你的特点是：
              1. 温暖、共情的回应风格
              2. 专注于倾听和理解用户的情绪
              3. 提供简单实用的情绪调节建议
              4. 避免过度诊断或医疗建议
              5. 鼓励用户进行轻量级的积极行动

              当前对话背景：${context || '用户正在进行情绪签到'}`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        return response.data.choices[0].message.content;
      }

      // 如果API不可用，返回模拟响应
      throw new Error('Using mock response');
    } catch (error) {
      console.error('AI API Error, using mock response:', error);
      // 返回一个智能的模拟响应
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      const baseResponse = mockResponses[randomIndex];

      // 根据用户消息内容调整响应
      let personalizedResponse = baseResponse;

      if (message.includes('焦虑') || message.includes('紧张')) {
        personalizedResponse += " 对于焦虑，我建议你可以尝试深呼吸练习：吸气4秒，屏息4秒，呼气4秒，重复几次。";
      } else if (message.includes('压力') || message.includes('累')) {
        personalizedResponse += " 感到压力时，不妨给自己一些时间休息。哪怕是5分钟的短暂休息也能带来很大的不同。";
      } else if (message.includes('考试') || message.includes('学习')) {
        personalizedResponse += " 学习压力确实很大，但记住你已经准备得很充分了。相信自己，你比你想象的更强大。";
      }

      return personalizedResponse;
    }
  },

  // 生成行动建议
  async generateActionSuggestions(emotion: string, intensity: number): Promise<any[]> {
    try {
      const response = await aiService.sendMessage(
        `基于用户当前情绪状态：${emotion}，强度：${intensity}/10，请推荐3个简单的情绪调节行动。
        请以JSON格式返回，包含：type(breathing/gratitude/exercise), title, description, duration(分钟), difficulty(easy/medium/hard)`
      );

      // 解析AI返回的建议
      const suggestions = JSON.parse(response);
      return Array.isArray(suggestions) ? suggestions : [];
    } catch (error) {
      // 返回默认建议
      return [
        {
          type: 'breathing',
          title: '深呼吸练习',
          description: '跟随引导进行4-7-8呼吸法',
          duration: 3,
          difficulty: 'easy'
        },
        {
          type: 'gratitude',
          title: '感恩记录',
          description: '写下3件今天让你感到感激的小事',
          duration: 5,
          difficulty: 'easy'
        },
        {
          type: 'exercise',
          title: '轻量运动',
          description: '进行5分钟的简单伸展运动',
          duration: 5,
          difficulty: 'medium'
        }
      ];
    }
  }
};