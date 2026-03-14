import { Emotion, Conversation, Action } from '../types';

// 本地存储服务
export const storageService = {
  // 保存情绪记录
  async saveEmotion(emotion: Emotion): Promise<void> {
    try {
      const existingEmotions = await this.getEmotions();
      const updatedEmotions = [...existingEmotions, emotion];
      localStorage.setItem('calm_mate_emotions', JSON.stringify(updatedEmotions));
    } catch (error) {
      console.error('Error saving emotion:', error);
    }
  },

  // 获取情绪记录
  async getEmotions(): Promise<Emotion[]> {
    try {
      const stored = localStorage.getItem('calm_mate_emotions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting emotions:', error);
      return [];
    }
  },

  // 保存对话记录
  async saveConversation(conversation: Conversation): Promise<void> {
    try {
      const existingConversations = await this.getConversations();
      const updatedConversations = [...existingConversations, conversation];
      localStorage.setItem('calm_mate_conversations', JSON.stringify(updatedConversations));
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  },

  // 获取对话记录
  async getConversations(): Promise<Conversation[]> {
    try {
      const stored = localStorage.getItem('calm_mate_conversations');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting conversations:', error);
      return [];
    }
  },

  // 保存行动记录
  async saveAction(action: Action): Promise<void> {
    try {
      const existingActions = await this.getActions();
      const updatedActions = [...existingActions, action];
      localStorage.setItem('calm_mate_actions', JSON.stringify(updatedActions));
    } catch (error) {
      console.error('Error saving action:', error);
    }
  },

  // 获取行动记录
  async getActions(): Promise<Action[]> {
    try {
      const stored = localStorage.getItem('calm_mate_actions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting actions:', error);
      return [];
    }
  },

  // 更新行动记录
  async updateAction(actionId: string, updates: Partial<Action>): Promise<void> {
    try {
      const actions = await this.getActions();
      const updatedActions = actions.map(action =>
        action.id === actionId ? { ...action, ...updates } : action
      );
      localStorage.setItem('calm_mate_actions', JSON.stringify(updatedActions));
    } catch (error) {
      console.error('Error updating action:', error);
    }
  },

  // 清除所有数据
  async clearAllData(): Promise<void> {
    try {
      localStorage.removeItem('calm_mate_emotions');
      localStorage.removeItem('calm_mate_conversations');
      localStorage.removeItem('calm_mate_actions');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
};

// 数据同步服务（为将来Supabase集成做准备）
export const syncService = {
  // 检查是否启用Supabase同步
  isSupabaseEnabled(): boolean {
    return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_ANON_KEY;
  },

  // 同步情绪数据到云端
  async syncEmotionsToCloud(emotions: Emotion[]): Promise<void> {
    if (!this.isSupabaseEnabled()) {
      console.log('Supabase not configured, skipping cloud sync');
      return;
    }

    try {
      // 这里将来实现Supabase同步逻辑
      console.log('Syncing emotions to cloud:', emotions.length, 'records');
    } catch (error) {
      console.error('Error syncing emotions to cloud:', error);
    }
  },

  // 从云端同步情绪数据
  async syncEmotionsFromCloud(): Promise<Emotion[]> {
    if (!this.isSupabaseEnabled()) {
      console.log('Supabase not configured, returning local data');
      return storageService.getEmotions();
    }

    try {
      // 这里将来实现Supabase同步逻辑
      console.log('Syncing emotions from cloud');
      return [];
    } catch (error) {
      console.error('Error syncing emotions from cloud:', error);
      return storageService.getEmotions();
    }
  }
};

// 数据导出/导入服务
export const dataService = {
  // 导出所有数据
  async exportAllData(): Promise<string> {
    try {
      const emotions = await storageService.getEmotions();
      const conversations = await storageService.getConversations();
      const actions = await storageService.getActions();

      const exportData = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        data: {
          emotions,
          conversations,
          actions
        }
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  },

  // 导入数据
  async importData(jsonData: string): Promise<void> {
    try {
      const importData = JSON.parse(jsonData);

      if (importData.data?.emotions) {
        localStorage.setItem('calm_mate_emotions', JSON.stringify(importData.data.emotions));
      }

      if (importData.data?.conversations) {
        localStorage.setItem('calm_mate_conversations', JSON.stringify(importData.data.conversations));
      }

      if (importData.data?.actions) {
        localStorage.setItem('calm_mate_actions', JSON.stringify(importData.data.actions));
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }
};