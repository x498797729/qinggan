import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Emotion, Conversation, Action, EmotionCheckIn } from '../types';

// 应用状态接口
interface AppState {
  currentUser: {
    id: string;
    nickname: string;
    isLoggedIn: boolean;
  };
  emotions: Emotion[];
  conversations: Conversation[];
  actions: Action[];
  currentCheckIn: EmotionCheckIn | null;
  isLoading: boolean;
}

// 初始状态
const initialState: AppState = {
  currentUser: {
    id: 'user-001',
    nickname: '用户',
    isLoggedIn: true,
  },
  emotions: [],
  conversations: [],
  actions: [],
  currentCheckIn: null,
  isLoading: false,
};

// 创建应用切片
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // 添加情绪记录
    addEmotion: (state, action: PayloadAction<Emotion>) => {
      state.emotions.push(action.payload);
    },

    // 添加对话记录
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },

    // 添加行动记录
    addAction: (state, action: PayloadAction<Action>) => {
      state.actions.push(action.payload);
    },

    // 设置当前签到
    setCurrentCheckIn: (state, action: PayloadAction<EmotionCheckIn | null>) => {
      state.currentCheckIn = action.payload;
    },

    // 更新行动完成状态
    completeAction: (state, action: PayloadAction<{ id: string; moodAfter: number }>) => {
      const actionItem = state.actions.find(a => a.id === action.payload.id);
      if (actionItem) {
        actionItem.completed = true;
        actionItem.mood_after = action.payload.moodAfter;
      }
    },
  },
});

// 导出 actions
export const {
  setLoading,
  addEmotion,
  addConversation,
  addAction,
  setCurrentCheckIn,
  completeAction,
} = appSlice.actions;

// 创建 store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
});

// 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;