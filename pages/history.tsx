import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { format, subDays, startOfDay } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from '../components/Navigation';
import { emotionAnalytics, emotionLabels, emotionColors } from '../utils/emotionAnalytics';
import { Action } from '../types';

export default function History() {
  const emotions = useSelector((state: RootState) => state.app.emotions);

  // 生成情绪趋势数据
  const chartData = useMemo(() => {
    return emotionAnalytics.generateEmotionTrend(emotions, 7);
  }, [emotions]);

  const stats = useMemo(() => {
    return emotionAnalytics.calculateEmotionStats(emotions);
  }, [emotions]);

  const insights = useMemo(() => {
    const actions: Action[] = []; // 暂时为空，后续可以从store获取
    return emotionAnalytics.generateInsights(emotions, actions);
  }, [emotions]);

  const emotionColors = {
    anxious: '#FF6B6B',
    stressed: '#FF8E53',
    sad: '#4ECDC4',
    angry: '#FF6B9D',
    neutral: '#95E1D3',
    happy: '#F38181',
    excited: '#AA96DA'
  };

  const emotionLabels = {
    anxious: '焦虑',
    stressed: '压力大',
    sad: '难过',
    angry: '生气',
    neutral: '平静',
    happy: '开心',
    excited: '兴奋'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: '600' }}>
            {label}
          </p>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
            情绪强度: {payload[0].value}/10
          </p>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
            主要情绪: {emotionLabels[data.emotion as keyof typeof emotionLabels]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: 'var(--primary)',
          marginBottom: '8px'
        }}>
          📊 情绪轨迹
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          过去7天的情绪变化趋势
        </p>
      </div>

      {/* 统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--primary)',
            marginBottom: '4px'
          }}>
            {stats.averageIntensity}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            平均情绪分
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--success)',
            marginBottom: '4px'
          }}>
            {chartData.filter(d => d.intensity >= 6).length}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            良好天数
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--accent-blue)',
            marginBottom: '4px'
          }}>
            {stats.streakDays}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            连续签到
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: stats.improvementTrend > 0 ? 'var(--success)' : stats.improvementTrend < 0 ? 'var(--warning)' : 'var(--text-secondary)',
            marginBottom: '4px'
          }}>
            {stats.improvementTrend > 0 ? '+' : ''}{stats.improvementTrend}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            趋势变化
          </div>
        </div>
      </div>

      {/* 情绪曲线图 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--primary)',
          marginBottom: '20px'
        }}>
          情绪变化曲线
        </h2>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <YAxis
                domain={[1, 10]}
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: 'var(--primary)', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '16px',
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }}>
          <span>1 = 很低落</span>
          <span>5 = 一般</span>
          <span>10 = 很积极</span>
        </div>

        {/* 情绪图例 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '16px'
        }}>
          {Object.entries(emotionLabels).map(([key, label]) => (
            <div key={key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: emotionColors[key as keyof typeof emotionColors]
              }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 每日详情 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--primary)',
          marginBottom: '20px'
        }}>
          每日详情
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {chartData.map((day, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: emotionColors[day.emotion as keyof typeof emotionColors] + '20',
                  border: `2px solid ${emotionColors[day.emotion as keyof typeof emotionColors]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {day.emotion === 'anxious' && '😰'}
                  {day.emotion === 'stressed' && '😤'}
                  {day.emotion === 'sad' && '😢'}
                  {day.emotion === 'angry' && '😠'}
                  {day.emotion === 'neutral' && '😐'}
                  {day.emotion === 'happy' && '😊'}
                  {day.emotion === 'excited' && '🤗'}
                </div>
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '2px'
                  }}>
                    {day.date}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}>
                    主要情绪: {emotionLabels[day.emotion as keyof typeof emotionLabels]}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  marginBottom: '2px'
                }}>
                  {day.intensity}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  / 10
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 洞察与建议 */}
      <div className="card">
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--primary)',
          marginBottom: '16px'
        }}>
          💡 洞察与建议
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${
                    insight.type === 'positive' ? 'var(--success)' :
                    insight.type === 'warning' ? 'var(--warning)' :
                    'var(--accent-blue)'
                  }`
                }}
              >
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px'
                }}>
                  {insight.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                  {insight.description}
                </p>
              </div>
            ))
          ) : (
            <div style={{
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                继续签到几天，我们将为你提供个性化的洞察和建议
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 底部导航间距 */}
      <div style={{ height: '80px' }} />

      <Navigation />
    </div>
  );
}