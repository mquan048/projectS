// src/services/seeders/printOrderSeeder.js
import pool from '../../config/db.js';
import createPrintOrder from '../factories/printOrderFactory.js';

const seedPrintOrders = async (count = 200) => {
  try {
    console.log(`🌱 Seeding ${count} print orders...`);

    // Get all existing user IDs
    const userResult = await pool.query('SELECT id FROM users');
    const userIds = userResult.rows.map(row => row.id);

    // Get all existing document IDs
    const documentResult = await pool.query('SELECT id FROM documents');
    const documentIds = documentResult.rows.map(row => row.id);

    // Get all existing printer IDs
    const printerResult = await pool.query('SELECT printer_id FROM printers');
    const printerIds = printerResult.rows.map(row => row.printer_id);

    for (let i = 0; i < count; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const documentId = documentIds[Math.floor(Math.random() * documentIds.length)];
      const printerId = printerIds[Math.floor(Math.random() * printerIds.length)];

      const printOrderData = createPrintOrder(userId, documentId, printerId);

      await pool.query(`
        INSERT INTO print_orders (
          user_id, document_id, printer_id, start_time, end_time,
          sided, paper_size, paper_orientation, pages_per_sheet,
          number_of_copies, scale, p_state, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `, [
        printOrderData.user_id,
        printOrderData.document_id,
        printOrderData.printer_id,
        printOrderData.start_time,
        printOrderData.end_time,
        printOrderData.sided,
        printOrderData.paper_size,
        printOrderData.paper_orientation,
        printOrderData.pages_per_sheet,
        printOrderData.number_of_copies,
        printOrderData.scale,
        printOrderData.p_state,
        printOrderData.created_at,
        printOrderData.updated_at
      ]);
    }

    console.log('✅ Print orders seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding print orders:', error);
    throw error;
  }
};

export default seedPrintOrders;
