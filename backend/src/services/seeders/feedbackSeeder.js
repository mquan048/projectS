// src/services/seeders/feedbackSeeder.js
import pool from '../../config/db.js';
import createFeedback from '../factories/feedbackFactory.js';

const seedFeedbacks = async (count = 80) => {
  try {
    console.log(`🌱 Seeding ${count} feedbacks...`);

    // Get all existing user IDs
    const userResult = await pool.query('SELECT id FROM users');
    const userIds = userResult.rows.map(row => row.id);

    for (let i = 0; i < count; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const feedbackData = createFeedback(userId);

      await pool.query(`
        INSERT INTO feedbacks (
          user_id, title, content, rating,
          submission_date, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        feedbackData.user_id,
        feedbackData.title,
        feedbackData.content,
        feedbackData.rating,
        feedbackData.submission_date,
        feedbackData.created_at,
        feedbackData.updated_at
      ]);
    }

    console.log('✅ Feedbacks seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding feedbacks:', error);
    throw error;
  }
};

export default seedFeedbacks;
