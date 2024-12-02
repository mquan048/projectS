// src/services/seeders/printerSeeder.js
import pool from '../../config/db.js';
import createPrinter from '../factories/printerFactory.js';

const seedPrinters = async (count = 20) => {
  try {
    console.log(`🌱 Seeding ${count} printers...`);

    for (let i = 0; i < count; i++) {
      const printerData = createPrinter();
      await pool.query(`
        INSERT INTO printers (name, brand, model, state, campus, building, room, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        printerData.name,
        printerData.brand,
        printerData.model,
        printerData.state,
        printerData.campus,
        printerData.building,
        printerData.room,
        printerData.created_at,
        printerData.updated_at
      ]);
    }

    console.log('✅ Printers seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding printers:', error);
    throw error;
  }
};

export default seedPrinters;
