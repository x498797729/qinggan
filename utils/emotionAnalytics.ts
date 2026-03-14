import { Emotion, Action } from '../types';
import { format, subDays, startOfDay, isAfter, isBefore } from 'date-fns';

// 情绪分析工具
export const emotionAnalytics = {
  // 生成情绪趋势数据
  generateEmotionTrend(emotions: Emotion[], days: number = 7) {
    const data = [];
    const today = startOfDay(new Date());

    for (let i = days - 1; i >= 0; i--) {
      const date = startOfDay(subDays(today, i));
      const dateStr = format(date, 'yyyy-MM-dd');

      // 找到当天的所有情绪记录
      const dayEmotions = emotions.filter(emotion =>
        emotion.created_at.includes(dateStr)
      );

      if (dayEmotions.length > 0) {
        // 计算当天的平均情绪强度
        const avgIntensity = dayEmotions.reduce((sum, e) => sum + e.intensity, 0) / dayEmotions.length;
        const dominantEmotion = this.getDominantEmotion(dayEmotions);

        data.push({
          date: format(date, 'MM/dd'),
          fullDate: dateStr,
          intensity: Math.round(avgIntensity * 10) / 10,
          emotion: dominantEmotion,
          count: dayEmotions.length
        });
      } else {
        // 没有数据的日子使用插值或默认值
        data.push({
          date: format(date, 'MM/dd'),
          fullDate: dateStr,
          intensity: 5, // 默认中性值
          emotion: 'neutral' as const,
          count: 0
        });
      }
    }

    return data;
  },

  // 获取主导情绪
  private getDominantEmotion(emotions: Emotion[]): Emotion['emotion_type'] {
    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion.emotion_type] = (acc[emotion.emotion_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(emotionCounts).reduce((a, b) =>
      emotionCounts[a[0]] > emotionCounts[b[0]] ? a : b
    )[0] as Emotion['emotion_type'];
  },

  // 计算情绪统计
  calculateEmotionStats(emotions: Emotion[]) {
    if (emotions.length === 0) {
      return {
        totalCheckIns: 0,
        averageIntensity: 0,
        mostCommonEmotion: 'neutral' as Emotion['emotion_type'],
        streakDays: 0,
        improvementTrend: 0
      };
    }

    const totalCheckIns = emotions.length;
    const averageIntensity = emotions.reduce((sum, e) => sum + e.intensity, 0) / emotions.length;

    // 计算最常见情绪
    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion.emotion_type] = (acc[emotion.emotion_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonEmotion = Object.entries(emotionCounts).reduce((a, b) =>
      emotionCounts[a[0]] > emotionCounts[b[0]] ? a : b
    )[0] as Emotion['emotion_type'];

    // 计算连续签到天数
    const streakDays = this.calculateStreakDays(emotions);

    // 计算改善趋势（最近3天与前3天的对比）
    const improvementTrend = this.calculateImprovementTrend(emotions);

    return {
      totalCheckIns,
      averageIntensity: Math.round(averageIntensity * 10) / 10,
      mostCommonEmotion,
      streakDays,
      improvementTrend
    };
  },

  // 计算连续天数
  private calculateStreakDays(emotions: Emotion[]): number {
    const sortedEmotions = emotions
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    let streak = 0;
    const today = startOfDay(new Date());

    for (let i = 0; i < 30; i++) { // 最多检查30天
      const checkDate = startOfDay(subDays(today, i));
      const dateStr = format(checkDate, 'yyyy-MM-dd');

      const hasCheckIn = sortedEmotions.some(emotion =>
        emotion.created_at.includes(dateStr)
      );

      if (hasCheckIn) {
        streak++;
      } else if (i > 0) { // 允许今天没有签到，但不允许中间断掉
        break;
      }
    }

    return streak;
  },

  // 计算改善趋势
  private calculateImprovementTrend(emotions: Emotion[]): number {
    const sortedEmotions = emotions
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (sortedEmotions.length < 6) return 0;

    const recentEmotions = sortedEmotions.slice(0, 3);
    const previousEmotions = sortedEmotions.slice(3, 6);

    if (previousEmotions.length === 0) return 0;

    const recentAvg = recentEmotions.reduce((sum, e) => sum + e.intensity, 0) / recentEmotions.length;
    const previousAvg = previousEmotions.reduce((sum, e) => sum + e.intensity, 0) / previousEmotions.length;

    return Math.round((recentAvg - previousAvg) * 10) / 10;
  },

  // 生成洞察报告
  generateInsights(emotions: Emotion[], actions: Action[]) {
    const stats = this.calculateEmotionStats(emotions);
    const insights = [];

    // 基于统计数据生成洞察
    if (stats.averageIntensity >= 7) {
      insights.push({
        type: 'positive',
        title: '情绪状态良好',
        description: '你的平均情绪强度较高，保持积极的心态很棒！'
      });
    } else if (stats.averageIntensity <= 4) {
      insights.push({
        type: 'warning',
        title: '需要关注情绪',
        description: '最近情绪强度偏低，建议多进行深呼吸和感恩练习。'
      });
    }

    if (stats.streakDays >= 7) {
      insights.push({
        type: 'positive',
        title: '签到习惯优秀',
        description: `连续签到${stats.streakDays}天，规律的签到有助于情绪管理。`
      });
    }

    if (stats.improvementTrend > 0.5) {
      insights.push({
        type: 'positive',
        title: '情绪持续改善',
        description: `最近情绪有明显改善，继续保持当前的做法。`
      });
    }

    // 基于行动完成情况分析
    const completedActions = actions.filter(a => a.completed).length;
    const totalActions = actions.length;

    if (totalActions > 0) {
      const completionRate = (completedActions / totalActions) * 100;
      if (completionRate >= 80) {
        insights.push({
          type: 'positive',
          title: '行动完成度高',
          description: `行动完成率达到${Math.round(completionRate)}%，执行力很强！`
        });
      } else if (completionRate <= 50) {
        insights.push({
          type: 'suggestion',
          title: '增加行动实践',
          description: '尝试完成更多建议的行动，它们对情绪调节很有帮助。'
        });
      }
    }

    return insights;
  },

  // 获取情绪分布
  getEmotionDistribution(emotions: Emotion[]) {
    const distribution = emotions.reduce((acc, emotion) => {
      acc[emotion.emotion_type] = (acc[emotion.emotion_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = emotions.length;
    return Object.entries(distribution).map(([emotion, count]) => ({
      emotion,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }));
  }
};

// 情绪标签映射
export const emotionLabels = {
  anxious: '焦虑',
  stressed: '压力大',
  sad: '难过',
  angry: '生气',
  neutral: '平静',
  happy: '开心',
  excited: '兴奋'
};

// 情绪颜色映射
export const emotionColors = {
  anxious: '#FF6B6B',
  stressed: '#FF8E53',
  sad: '#4ECDC4',
  angry: '#FF6B9D',
  neutral: '#95E1D3',
  happy: '#F38181',
  excited: '#AA96DA'
};