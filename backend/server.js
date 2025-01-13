const express = require('express');
const cors = require('cors');
const tarotRoutes = require('./routes/tarotRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const { executeQuery } = require('./db');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트 등록
app.use('/api', tarotRoutes);

app.use('/api', userRoutes);

// 서버 실행
const PORT = process.env.PORT || 5000;

app.get('/users', async (req, res) => {
    try {
      const email = req.query.email;
      const query = 'SELECT * FROM users WHERE email = ?';
      const result = await executeQuery(query, [email]);
      res.json(result);
    } catch (err) {
      res.status(500).send('Database query failed');
    }
  });
  
  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });