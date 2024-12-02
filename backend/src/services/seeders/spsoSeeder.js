// src/services/seeders/spsoSeeder.js
import pool from '../../config/db.js';
import createSPSO from '../factories/spsoFactory.js';

const seedSPSOs = async (count = 5) => {
  try {
    console.log(`🌱 Đang tạo ${count} SPSOs...`);

    for (let i = 0; i < count; i++) {
      const spsoData = createSPSO(i);
      await pool.query(`
        INSERT INTO spsos (
          username,
          password,
          full_name,
          email,
          phone_number,
          date_of_birth,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        spsoData.username,
        spsoData.password,
        spsoData.full_name,
        spsoData.email,
        spsoData.phone_number,
        spsoData.date_of_birth,
        spsoData.created_at,
        spsoData.updated_at
      ]);
    }

    console.log('✅ SPSOs seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding spsos', error);
    throw error;
  }
};

export default seedSPSOs;
