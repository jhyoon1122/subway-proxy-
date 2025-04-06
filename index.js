const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/subway/:apiKey/:start/:end/:date', async (req, res) => {
  const { apiKey, start, end, date } = req.params;

  const targetUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/CardSubwayStatsNew/${start}/${end}/${date}`;
  console.log(`Calling: ${targetUrl}`);

  try {
    const response = await axios.get(targetUrl);
    res.json(response.data); // 서울시 JSON 그대로 반환
  } catch (error) {
    res.status(500).json({
      error: 'Proxy Error',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});
