// src/services/seeders/pageOrderSeeder.js
import pool from '../../config/db.js';
import createPageOrder from '../factories/pageOrderFactory.js';

const seedPageOrders = async (count = 150) => {
  try {
    console.log(`🌱 Seeding ${count} page orders...`);

    // Get all existing user IDs
    const userResult = await pool.query('SELECT id FROM users');
    const userIds = userResult.rows.map(row => row.id);

    for (let i = 0; i < count; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const pageOrderData = createPageOrder(userId);

      await pool.query(`
        INSERT INTO page_orders (
          user_id, number_of_a4_pages, transaction_time,
          o_state, price, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        pageOrderData.user_id,
        pageOrderData.number_of_a4_pages,
        pageOrderData.transaction_time,
        pageOrderData.o_state,
        pageOrderData.price,
        pageOrderData.created_at,
        pageOrderData.updated_at
      ]);
    }

    console.log('✅ Page orders seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding page orders:', error);
    throw error;
  }
};

export default seedPageOrders;
