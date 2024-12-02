// src/services/seeders/notificationSeeder.js
import pool from '../../config/db.js';
import createNotification from '../factories/notificationFactory.js';

const seedNotifications = async (count = 300) => {
  try {
    console.log(`🌱 Seeding ${count} notifications...`);

    // Get all existing user IDs
    const userResult = await pool.query('SELECT id FROM users');
    const userIds = userResult.rows.map(row => row.id);

    for (let i = 0; i < count; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const notificationData = createNotification(userId);

      await pool.query(`
        INSERT INTO notifications (
          user_id, content, sent_time,
          status, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        notificationData.user_id,
        notificationData.content,
        notificationData.sent_time,
        notificationData.status,
        notificationData.created_at,
        notificationData.updated_at
      ]);
    }

    console.log('✅ Notifications seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
    throw error;
  }
};

export default seedNotifications;
