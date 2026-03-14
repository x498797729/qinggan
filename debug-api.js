// LongCat API 调试脚本
const axios = require('axios');

async function debugLongCatAPI() {
  console.log('🔧 LongCat API 调试模式');
  console.log('========================');

  const API_KEY = 'ak_23n2Y77gI7eA1xA0o35UA7Nx4QE9q';

  // 测试不同的 API 端点
  const endpoints = [
    'https://api.longcat.ai/v1',
    'https://longcat.ai/api/v1',
    'https://api.longcat.ai/openapi/v1',
    'https://longcat.ai/v1'
  ];

  // 测试不同的模型名称
  const models = [
    'longcat-v1',
    'longcat-1',
    'longcat',
    'LongCat-v1'
  ];

  for (const endpoint of endpoints) {
    console.log(`\n🌐 测试端点: ${endpoint}`);

    for (const model of models) {
      try {
        console.log(`  🤖 测试模型: ${model}`);

        const response = await axios.post(`${endpoint}/chat/completions`, {
          model: model,
          messages: [
            {
              role: 'user',
              content: '你好，这是一个测试消息'
            }
          ],
          max_tokens: 50
        }, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        });

        console.log(`  ✅ 成功！响应: ${response.data.choices[0].message.content.substring(0, 50)}...`);
        return; // 如果成功就停止测试

      } catch (error) {
        if (error.response) {
          console.log(`  ❌ 错误 ${error.response.status}: ${error.response.statusText}`);
        } else {
          console.log(`  ❌ 连接错误: ${error.message}`);
        }
      }
    }
  }

  console.log('\n💡 建议：');
  console.log('1. 检查 API Key 是否正确');
  console.log('2. 确认 LongCat API 文档中的正确端点');
  console.log('3. 检查网络连接和代理设置');
  console.log('4. 联系 LongCat 支持获取正确的 API 配置');
}

debugLongCatAPI();