const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/blood-pressure-info', async (req, res) => {
  try {
    const response = await axios.get('https://wsearch.nlm.nih.gov/ws/query', {
      params: { db: 'healthtopics', term: 'high blood pressure' },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
