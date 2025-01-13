const express = require('express');
const { executeQuery } = require('../db'); // executeQuery 가져오기
const router = express.Router();

// 회원가입 API
router.post('/register', async (req, res) => {
    const { username, email, password, profileImage } = req.body;
  
    if (!username || !email || !password) {
      console.log('회원가입 실패: 필드 누락');
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }
  
    try {
      // ROWNUMBER 계산 쿼리
      const rowNumberQuery = `
        SELECT 
          COALESCE(MAX(id), 0) + 1 AS next_id 
        FROM users;
      `;
      const [rowResult] = await executeQuery(rowNumberQuery);
  
      const nextId = rowResult.next_id; // 다음 ROWNUMBER 값
      console.log('계산된 ROWNUMBER(ID):', nextId);
  
      // INSERT 쿼리
      const insertQuery = `
        INSERT INTO users (id, username, email, password, profile_image)
        VALUES (?, ?, ?, ?, ?);
      `;
      const values = [nextId, username, email, password, profileImage || null];
      const result = await executeQuery(insertQuery, values);
  
      console.log('회원가입 성공:', result);
  
      res.status(201).json({
        message: '회원가입 성공!',
        userId: nextId,
      });
    } catch (error) {
      console.error('회원가입 에러:', error);
      res.status(500).json({ message: '서버 에러 발생!' });
    }
  });
  

// 로그인 API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('로그인 실패: 필드 누락');
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    console.log('실행할 쿼리:', query);

    const results = await executeQuery(query, [email]);
    console.log('DB 조회 결과:', results);

    if (results.length === 0) {
      console.log('로그인 실패: 이메일 없음');
      return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }

    const user = results[0];
    console.log('사용자 정보:', user);

    if (password !== user.password) {
      console.log('로그인 실패: 비밀번호 불일치');
      return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }

    console.log('로그인 성공: 사용자 인증 성공');
    res.status(200).json({
      message: '로그인 성공!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile_image: user.profile_image,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '서버 에러 발생!' });
  }
});

module.exports = router;
