import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addEmotion, addConversation, setCurrentCheckIn } from '../lib/store';
import { EmotionCheckIn, AIResponse } from '../types';
import { aiService, conversationService } from '../lib/aiService';
import Navigation from '../components/Navigation';

export default function CheckIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1); // 1: 选择情绪, 2: 强度评估, 3: 详细描述, 4: AI对话
  const [checkInData, setCheckInData] = useState<EmotionCheckIn>({
    emotion: 'neutral',
    intensity: 5,
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiFullResponse, setAiFullResponse] = useState<AIResponse | null>(null);
  const [sessionId, setSessionId] = useState('');

  const emotions = [
    { value: 'anxious', label: '焦虑', emoji: '😰', color: '#FF6B6B' },
    { value: 'stressed', label: '压力大', emoji: '😤', color: '#FF8E53' },
    { value: 'sad', label: '难过', emoji: '😢', color: '#4ECDC4' },
    { value: 'angry', label: '生气', emoji: '😠', color: '#FF6B9D' },
    { value: 'neutral', label: '平静', emoji: '😐', color: '#95E1D3' },
    { value: 'happy', label: '开心', emoji: '😊', color: '#F38181' },
    { value: 'excited', label: '兴奋', emoji: '🤗', color: '#AA96DA' }
  ];

  const handleEmotionSelect = (emotion: string) => {
    setCheckInData(prev => ({ ...prev, emotion: emotion as any }));
    setStep(2);
  };

  const handleIntensityChange = (intensity: number) => {
    setCheckInData(prev => ({ ...prev, intensity }));
  };

  const handleContentChange = (content: string) => {
    setCheckInData(prev => ({ ...prev, content }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleSubmitCheckIn = async () => {
    setIsLoading(true);

    try {
      // 生成会话ID
      const newSessionId = conversationService.generateSessionId();
      setSessionId(newSessionId);

      // 获取AI响应
      const response = await aiService.generateEmpatheticResponse(checkInData);
      setAiResponse(response.message);
      setAiFullResponse(response);

      // 保存情绪记录
      const emotionRecord = {
        id: Date.now().toString(),
        user_id: 'user-001',
        emotion_type: checkInData.emotion,
        intensity: checkInData.intensity,
        content: checkInData.content,
        created_at: new Date().toISOString()
      };

      // 保存对话记录
      const conversationRecord = await conversationService.saveConversation(
        'user-001',
        newSessionId,
        `情绪签到: ${checkInData.emotion}, 强度: ${checkInData.intensity}${checkInData.content ? `, 描述: ${checkInData.content}` : ''}`,
        response.message,
        checkInData.emotion
      );

      dispatch(addEmotion(emotionRecord));
      dispatch(addConversation(conversationRecord));
      dispatch(setCurrentCheckIn(checkInData));

      setStep(4);
    } catch (error) {
      console.error('Error submitting check-in:', error);
      // 使用备用响应
      const fallbackResponse = generateMockAiResponse(checkInData);
      setAiResponse(fallbackResponse);
      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockAiResponse = (data: EmotionCheckIn): string => {
    const responses = {
      anxious: "我感受到你现在有些焦虑。这种感觉确实不容易，但请记住，焦虑只是暂时的，它终会过去。你已经很勇敢地来到这里分享你的感受了。让我们一起做几个深呼吸，慢慢来，不用着急。",
      stressed: "听起来你现在的压力很大。生活中的各种责任和期望确实会让人感到喘不过气。但我想告诉你，你的感受是完全正常的。每个人都会有这样的时候。让我们一起找到一些简单的方法来缓解这种压力。",
      sad: "我能感受到你现在的心情比较低落。有时候生活中的一些事情确实会让我们感到难过。但请相信，这种情绪也是你内心敏感和富有同理心的表现。让我们一起慢慢地走出这个情绪。",
      angry: "愤怒是一种很强烈的情绪，它说明你对自己或某些事情有很高的期待。虽然愤怒让人不舒服，但它也是一种能量，提醒我们要关注自己的边界和需求。让我们一起学会如何健康地表达这种情绪。",
      neutral: "你现在的状态比较平静，这很好。有时候能够保持内心的宁静是一种难得的能力。让我们继续保持这种状态，也可以借此机会做一些积极的练习来进一步提升你的情绪状态。",
      happy: "我很高兴感受到你的好心情！积极的情绪确实会让整个人的状态都变得不一样。让我们一起保持这种正能量，也可以考虑做一些感恩练习来延续这种美好的感觉。",
      excited: "你的兴奋情绪很有感染力！这种积极向上的状态很棒。让我们把这种能量转化为一些积极的行动，让这份兴奋变成推动你前进的动力。"
    };

    return responses[data.emotion as keyof typeof responses] || responses.neutral;
  };

  const handleFinish = () => {
    router.push('/');
  };

  return (
    <div className="container">
      {/* 进度指示器 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--primary)'
          }}>
            情绪签到
          </h1>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            第 {step} 步，共 3 步
          </span>
        </div>
        <div style={{
          height: '4px',
          background: 'var(--bg-secondary)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'var(--primary)',
            borderRadius: '2px',
            width: `${(step / 3) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* 步骤内容 */}
      {step === 1 && (
        <div className="card">
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--primary)',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            你现在的感受是？
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {emotions.map((emotion) => (
              <button
                key={emotion.value}
                onClick={() => handleEmotionSelect(emotion.value)}
                style={{
                  padding: '20px 16px',
                  border: checkInData.emotion === emotion.value ? `2px solid ${emotion.color}` : '2px solid var(--border)',
                  borderRadius: '12px',
                  background: checkInData.emotion === emotion.value ? `${emotion.color}15` : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '32px' }}>{emotion.emoji}</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: checkInData.emotion === emotion.value ? emotion.color : 'var(--text-primary)'
                }}>
                  {emotion.label}
                </span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handleBack}>
              返回
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!checkInData.emotion}
            >
              下一步
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--primary)',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            这种感受的强度是？
          </h2>
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>轻微</span>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--primary)'
              }}>
                {checkInData.intensity}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>强烈</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={checkInData.intensity}
              onChange={(e) => handleIntensityChange(parseInt(e.target.value))}
              className="emotion-slider"
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px'
            }}>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <span
                  key={num}
                  style={{
                    fontSize: '12px',
                    color: num === checkInData.intensity ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: num === checkInData.intensity ? '600' : 'normal'
                  }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handleBack}>
              返回
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              下一步
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--primary)',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            想分享一下发生了什么吗？
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            （可选）写下你的想法，这有助于AI更好地理解你的情况
          </p>
          <textarea
            className="textarea"
            placeholder="比如：今天考试让我很紧张... 或者 和朋友吵架了感觉很难过..."
            value={checkInData.content}
            onChange={(e) => handleContentChange(e.target.value)}
            style={{ marginBottom: '32px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handleBack}>
              返回
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmitCheckIn}
              disabled={isLoading}
            >
              {isLoading ? '正在分析...' : '获取AI建议'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--primary)',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            AI 的回应
          </h2>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                flexShrink: 0
              }}>
                AI
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  color: 'var(--text-primary)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {aiResponse}
                </p>
              </div>
            </div>
          </div>

          {/* 建议的行动 */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--primary)',
              marginBottom: '12px'
            }}>
              💡 建议尝试
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {aiFullResponse?.suggestedActions.map((action, index) => (
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {action.type === 'breathing' && '🧘‍♀️'}
                      {action.type === 'gratitude' && '📝'}
                      {action.type === 'exercise' && '🚶‍♀️'}
                    </span>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '2px'
                      }}>
                        {action.title}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)'
                      }}>
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--primary)',
                      marginBottom: '2px'
                    }}>
                      {action.duration}分钟
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      textTransform: 'capitalize'
                    }}>
                      {action.difficulty === 'easy' && '简单'}
                      {action.difficulty === 'medium' && '中等'}
                      {action.difficulty === 'hard' && '困难'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={handleFinish}>
              完成签到
            </button>
          </div>
        </div>
      )}

      {/* 底部导航间距 */}
      <div style={{ height: '80px' }} />

      <Navigation />
    </div>
  );
}