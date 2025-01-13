const express = require('express');
const { getAllTarotCards, createReading, getReadingCards } = require('../models/tarot');
const router = express.Router();

// 모든 Tarot 카드 조회
router.get('/tarot-cards', async (req, res) => {
  try {
    const cards = await getAllTarotCards();
    res.json(cards);
  } catch (error) {
    console.error('Error fetching tarot cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch tarot cards',
      error: error.message
    });
  }
});

// 새로운 Tarot 리딩 생성
router.post('/create-reading', async (req, res) => {
  const { userId, cardCount } = req.body;

  // 입력값 검증
  if (!userId || !cardCount || typeof userId !== 'number' || typeof cardCount !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input. Please provide valid userId and cardCount.'
    });
  }

  try {
    const readingId = await createReading(userId, cardCount);
    res.json({ readingId });
  } catch (error) {
    console.error('Error creating tarot reading:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create tarot reading',
      error: error.message
    });
  }
});

// 특정 리딩의 카드 정보 가져오기
router.get('/reading/:id/cards', async (req, res) => {
  const { id } = req.params;

  try {
    const cards = await getReadingCards(id);

    if (cards.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `No cards found for reading ID: ${id}`
      });
    }

    res.json(cards);
  } catch (error) {
    console.error('Error fetching reading cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reading cards',
      error: error.message
    });
  }
});

// 서버 상태 확인용 Ping API
router.get('/ping', async (req, res) => {
  try {
    res.json({ status: 'success', message: 'API is running!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'API is down!' });
  }
});

module.exports = router;
