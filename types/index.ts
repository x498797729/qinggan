// 用户相关类型
export interface User {
  id: string;
  email: string;
  nickname: string;
  subscription_type: 'free' | 'premium' | 'student';
  created_at: string;
}

// 情绪记录类型
export interface Emotion {
  id: string;
  user_id: string;
  emotion_type: 'anxious' | 'stressed' | 'sad' | 'angry' | 'neutral' | 'happy' | 'excited';
  intensity: number; // 1-10
  content: string;
  created_at: string;
}

// 对话记录类型
export interface Conversation {
  id: string;
  user_id: string;
  session_id: string;
  user_message: string;
  ai_response: string;
  emotion_context?: string;
  created_at: string;
}

// 行动记录类型
export interface Action {
  id: string;
  user_id: string;
  action_type: 'breathing' | 'gratitude' | 'exercise';
  mood_before: number;
  mood_after?: number;
  completed: boolean;
  created_at: string;
}

// 情绪签到数据类型
export interface EmotionCheckIn {
  emotion: Emotion['emotion_type'];
  intensity: number;
  content: string;
}

// AI对话响应类型
export interface AIResponse {
  message: string;
  suggestedActions: ActionSuggestion[];
  empathy_level: number;
}

// 行动建议类型
export interface ActionSuggestion {
  type: Action['action_type'];
  title: string;
  description: string;
  duration: number; // 分钟
  difficulty: 'easy' | 'medium' | 'hard';
}