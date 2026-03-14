import React from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';

export default function Home() {
  const router = useRouter();

  const handleStartCheckIn = () => {
    router.push('/check-in');
  };

  const handleViewHistory = () => {
    router.push('/history');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: 'var(--primary)',
          marginBottom: '16px'
        }}>
          CalmMate
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}>
          AI情绪疗愈助手
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '14px',
          color: 'var(--text-muted)'
        }}>
          <span>📅 今日情绪良好</span>
          <span>🎯 连续使用 3 天</span>
        </div>
      </header>

      {/* 核心功能卡片 */}
      <div style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
        {/* 情绪签到卡片 */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--primary)',
                marginBottom: '8px'
              }}>
                📝 情绪签到
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                花3分钟记录当前情绪，获得AI的共情回应和个性化建议
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'var(--bg-secondary)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  3分钟完成
                </span>
                <span style={{
                  background: 'var(--bg-secondary)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  AI共情回应
                </span>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleStartCheckIn}
              style={{ minWidth: '120px' }}
            >
              开始签到
            </button>
          </div>
        </div>

        {/* 情绪轨迹卡片 */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--primary)',
                marginBottom: '8px'
              }}>
                📊 情绪轨迹
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                查看过去7天的情绪变化曲线，了解自己的情绪模式
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'var(--bg-secondary)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  7天数据
                </span>
                <span style={{
                  background: 'var(--bg-secondary)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  可视化图表
                </span>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={handleViewHistory}
              style={{ minWidth: '120px' }}
            >
              查看轨迹
            </button>
          </div>
        </div>

        {/* 今日建议卡片 */}
        <div className="card">
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--primary)',
            marginBottom: '16px'
          }}>
            💡 今日建议
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '20px' }}>🧘‍♀️</span>
              <span style={{ color: 'var(--text-secondary)' }}>尝试5分钟深呼吸练习</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '20px' }}>📝</span>
              <span style={{ color: 'var(--text-secondary)' }}>记录3件感恩的小事</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '20px' }}>🚶‍♀️</span>
              <span style={{ color: 'var(--text-secondary)' }}>进行10分钟轻量运动</span>
            </div>
          </div>
        </div>
      </div>

      {/* 快速统计 */}
      <div className="card" style={{ background: 'var(--bg-secondary)' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--primary)',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          本周情绪概览
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--primary)',
              marginBottom: '4px'
            }}>
              5
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>签到次数</div>
          </div>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--success)',
              marginBottom: '4px'
            }}>
              6.2
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>平均情绪分</div>
          </div>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--accent-blue)',
              marginBottom: '4px'
            }}>
              3
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>完成行动</div>
          </div>
        </div>
      </div>

      {/* 底部导航间距 */}
      <div style={{ height: '80px' }} />

      <Navigation />
    </div>
  );
}