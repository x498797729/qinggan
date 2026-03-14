const axios = require('axios');

// 测试 LongCat API 连接
async function testLongCatAPI() {
  console.log('🔍 测试 LongCat API 连接...');

  const API_KEY = 'ak_23n2Y77gI7eA1xA0o35UA7Nx4QE9q';
  const API_URL = 'https://api.longcat.ai/v1';

  try {
    console.log('📤 发送测试请求到 LongCat API...');

    const response = await axios.post(`${API_URL}/chat/completions`, {
      model: 'longcat-v1',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的情绪疗愈助手，专门帮助大学生缓解焦虑和压力。'
        },
        {
          role: 'user',
          content: '我感到有些焦虑，能安慰我一下吗？'
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ API 连接成功！');
    console.log('📝 响应内容:', response.data.choices[0].message.content);

  } catch (error) {
    console.error('❌ API 连接失败:', error.message);

    if (error.response) {
      console.error('状态码:', error.response.status);
      console.error('错误详情:', error.response.data);
    }

    console.log('\n🔧 可能的问题：');
    console.log('1. API Key 格式不正确');
    console.log('2. API 端点 URL 不正确');
    console.log('3. 模型名称不正确');
    console.log('4. 网络连接问题');
  }
}

testLongCatAPI();