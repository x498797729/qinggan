import { aiService as baseAiService } from './api';
import { EmotionCheckIn, AIResponse, ActionSuggestion } from '../types';

// 增强的AI服务
export const aiService = {
  // 生成共情回应
  async generateEmpatheticResponse(checkIn: EmotionCheckIn): Promise<AIResponse> {
    try {
      const context = this.buildEmotionContext(checkIn);
      const message = await baseAiService.sendMessage(
        `用户当前情绪状态：${this.getEmotionLabel(checkIn.emotion)}，强度：${checkIn.intensity}/10。
        ${checkIn.content ? `用户描述："${checkIn.content}"` : ''}

        请给出温暖、共情的回应，并包含以下要素：
        1. 表达对用户的理解和共情
        2. 肯定用户分享情绪的勇气
        3. 提供一些安慰和鼓励的话语
        4. 引导用户进行积极的思考或行动

        回应风格要求：
        - 温暖、真诚的语气
        - 避免过度诊断或医疗建议
        - 保持简洁，不超过3-4句话
        - 让用户感到被理解和接纳`,
        context
      );

      // 生成行动建议
      const suggestions = await this.generateActionSuggestions(checkIn);

      return {
        message,
        suggestedActions: suggestions,
        empathy_level: this.calculateEmpathyLevel(checkIn.intensity)
      };
    } catch (error) {
      console.error('AI Response Error:', error);
      return this.getFallbackResponse(checkIn);
    }
  },

  // 生成行动建议
  async generateActionSuggestions(checkIn: EmotionCheckIn): Promise<ActionSuggestion[]> {
    try {
      const suggestions = await baseAiService.generateActionSuggestions(
        checkIn.emotion,
        checkIn.intensity
      );
      return suggestions;
    } catch (error) {
      console.error('Action Suggestions Error:', error);
      return this.getDefaultSuggestions(checkIn.emotion, checkIn.intensity);
    }
  },

  // 构建情绪上下文
  private buildEmotionContext(checkIn: EmotionCheckIn): string {
    const emotionInfo = {
      anxious: '用户感到焦虑不安，可能面临压力或不确定的情况',
      stressed: '用户感到压力很大，可能有很多事情需要处理',
      sad: '用户感到难过，可能遇到了一些挫折或失落',
      angry: '用户感到愤怒，可能对某些事情感到不满或受挫',
      neutral: '用户情绪比较平静，处于中性状态',
      happy: '用户感到开心，心情比较好',
      excited: '用户感到兴奋，充满积极能量'
    };

    return emotionInfo[checkIn.emotion] || '';
  },

  // 获取情绪标签
  private getEmotionLabel(emotion: string): string {
    const labels = {
      anxious: '焦虑',
      stressed: '压力大',
      sad: '难过',
      angry: '生气',
      neutral: '平静',
      happy: '开心',
      excited: '兴奋'
    };
    return labels[emotion as keyof typeof labels] || '平静';
  },

  // 计算共情级别
  private calculateEmpathyLevel(intensity: number): number {
    // 根据情绪强度调整共情级别
    if (intensity >= 8) return 5; // 高强度需要深度共情
    if (intensity >= 6) return 4;
    if (intensity >= 4) return 3;
    if (intensity >= 2) return 2;
    return 1; // 低强度保持温和共情
  },

  // 获取备用回应
  private getFallbackResponse(checkIn: EmotionCheckIn): AIResponse {
    const fallbackMessages = {
      anxious: "我感受到你现在有些焦虑。这种感觉确实不容易，但请记住，焦虑只是暂时的。你已经很勇敢地来这里分享你的感受了。让我们一起慢慢来，不用着急。",
      stressed: "听起来你现在的压力很大。生活中的各种责任确实会让人感到喘不过气。但我想告诉你，你的感受是完全正常的。每个人都会有这样的时候。",
      sad: "我能感受到你现在的心情比较低落。有时候生活中的一些事情确实会让我们感到难过。但请相信，这种情绪也是你内心敏感的表现。",
      angry: "愤怒是一种很强烈的情绪，它说明你对自己或某些事情有很高的期待。虽然愤怒让人不舒服，但它提醒我们要关注自己的边界。",
      neutral: "你现在的状态比较平静，这很好。有时候能够保持内心的宁静是一种难得的能力。让我们继续保持这种状态。",
      happy: "我很高兴感受到你的好心情！积极的情绪确实会让整个人的状态都变得不一样。让我们一起保持这种正能量。",
      excited: "你的兴奋情绪很有感染力！这种积极向上的状态很棒。让我们把这种能量转化为一些积极的行动。"
    };

    return {
      message: fallbackMessages[checkIn.emotion as keyof typeof fallbackMessages] || fallbackMessages.neutral,
      suggestedActions: this.getDefaultSuggestions(checkIn.emotion, checkIn.intensity),
      empathy_level: this.calculateEmpathyLevel(checkIn.intensity)
    };
  },

  // 获取默认建议
  private getDefaultSuggestions(emotion: string, intensity: number): ActionSuggestion[] {
    const baseSuggestions = [
      {
        type: 'breathing' as const,
        title: '深呼吸练习',
        description: '跟随引导进行4-7-8呼吸法，帮助身心平静',
        duration: 3,
        difficulty: 'easy' as const
      },
      {
        type: 'gratitude' as const,
        title: '感恩记录',
        description: '写下3件今天让你感到感激的小事',
        duration: 5,
        difficulty: 'easy' as const
      },
      {
        type: 'exercise' as const,
        title: '轻量运动',
        description: '进行5分钟的简单伸展运动，释放紧张',
        duration: 5,
        difficulty: 'medium' as const
      }
    ];

    // 根据情绪类型调整建议
    if (intensity >= 7) {
      // 高强度情绪，推荐更温和的活动
      return baseSuggestions.filter(s => s.difficulty === 'easy');
    }

    return baseSuggestions;
  }
};

// 对话管理服务
export const conversationService = {
  // 保存对话记录
  async saveConversation(userId: string, sessionId: string, userMessage: string, aiResponse: string, emotionContext?: string) {
    // 这里将来可以集成Supabase
    console.log('Saving conversation:', { userId, sessionId, userMessage, aiResponse, emotionContext });
    return {
      id: Date.now().toString(),
      user_id: userId,
      session_id: sessionId,
      user_message: userMessage,
      ai_response: aiResponse,
      emotion_context: emotionContext,
      created_at: new Date().toISOString()
    };
  },

  // 获取对话历史
  async getConversationHistory(userId: string, limit: number = 10) {
    // 这里将来可以集成Supabase
    console.log('Getting conversation history for user:', userId);
    return [];
  },

  // 生成会话ID
  generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};