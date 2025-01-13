const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// MySQL 연결 테스트
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('MySQL connected successfully!');
    connection.release();
  }
});

const promisePool = pool.promise();

async function executeQuery(query, params) {
  try {
    const [rows, fields] = await promisePool.query(query, params);
    console.log('Query Result:', rows);
    return rows;
  } catch (err) {
    console.error('Query Error:', err);
    throw err;
  }
}

module.exports = { executeQuery };