const db = require('../db');

// 모든 Tarot 카드 가져오기
const getAllTarotCards = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM tarot_cards');
    return rows;
  } catch (error) {
    console.error('Error fetching tarot cards:', error);
    throw new Error('Database error while fetching tarot cards');
  }
};

// 특정 리딩 생성
const createReading = async (userId, cardCount) => {
  try {
    const [result] = await db.query(
      'INSERT INTO tarot_readings (user_id, card_count) VALUES (?, ?)',
      [userId, cardCount]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating tarot reading:', error);
    throw new Error('Database error while creating tarot reading');
  }
};

// Tarot Reading의 카드 정보 가져오기
const getReadingCards = async (readingId) => {
  try {
    const [rows] = await db.query(
      'SELECT trc.*, tc.name, tc.image_url, tc.upright_meaning FROM tarot_reading_cards trc JOIN tarot_cards tc ON trc.card_id = tc.id WHERE trc.reading_id = ?',
      [readingId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching reading cards:', error);
    throw new Error('Database error while fetching reading cards');
  }
};

module.exports = { getAllTarotCards, createReading, getReadingCards };