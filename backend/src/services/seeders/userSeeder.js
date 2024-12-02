// src/services/seeders/userSeeder.js
import pool from '../../config/db.js';
import createUser from '../factories/userFactory.js';

const seedUsers = async (count = 50) => {
  try {
    console.log(`🌱 Seeding ${count} users...`);

    for (let i = 0; i < count; i++) {
      const userData = await createUser();
      await pool.query(`
        INSERT INTO users (email, password, full_name, date_of_birth, available_a4_pages, last_modified, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        userData.email,
        userData.password,
        userData.full_name,
        userData.date_of_birth,
        userData.available_a4_pages,
        userData.last_modified,
        userData.created_at,
        userData.updated_at
      ]);
    }

    console.log('✅ Users seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

export default seedUsers;
