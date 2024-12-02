import pool from '../../config/db.js';
import seedUsers from './userSeeder.js';
import seedSPSOs from './spsoSeeder.js';
import seedPrinters from './printerSeeder.js';
import seedDocuments from './documentSeeder.js';
import seedPrintOrders from './printOrderSeeder.js';
import seedPageOrders from './pageOrderSeeder.js';
import seedFeedbacks from './feedbackSeeder.js';
import seedNotifications from './notificationSeeder.js';
import { fileURLToPath } from 'url';

const clearDatabase = async () => {
  try {
    console.log('🧹 Clearing existing data...');
    await pool.query('DELETE FROM notifications');
    await pool.query('DELETE FROM feedbacks');
    await pool.query('DELETE FROM page_orders');
    await pool.query('DELETE FROM print_orders');
    await pool.query('DELETE FROM documents');
    await pool.query('DELETE FROM printers');
    await pool.query('DELETE FROM spsos');
    await pool.query('DELETE FROM users');
    console.log('✅ Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
};


const seedAll = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    await clearDatabase();
    await seedUsers(50);
    await seedSPSOs(5);
    await seedPrinters(20);
    await seedDocuments(100);
    await seedPrintOrders(200);
    await seedPageOrders(400);
    await seedFeedbacks(100);
    await seedNotifications(300);
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('Fatal error during seeding:', error);
    throw error;
  }
};


const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] === currentFile) {
  console.log('Running seeder directly...');
  seedAll()
    .then(() => {
      console.log('Seeding complete, exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Fatal error during seeding:', error);
      process.exit(1);
    });
}

export default seedAll;
