const db = require('../db');
const bcrypt = require('bcrypt'); // 비밀번호 암호화를 위해 bcrypt 사용

// 모든 사용자 가져오기
const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Database error while fetching users');
  }
};

// 특정 사용자 가져오기
const getUserById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; // ID는 고유하므로 하나의 행만 반환
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Database error while fetching user by ID');
  }
};


module.exports = { getAllUsers, getUserById };
