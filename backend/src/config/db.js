import pg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pg;

const dbConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),

    max: parseInt(process.env.DB_POOL_SIZE || '20'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(dbConfig);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const testConnection = async () => {
    let client;
    try {
        client = await pool.connect();
        console.log('Successfully connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
};

const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;

        console.log({
            query: text,
            params,
            duration,
            rows: res.rowCount
        });

        return res;
    } catch (error) {
        console.error('Database Query Error:', {
            query: text,
            params,
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
};

const transaction = async (callback) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export {
    pool as default,
    testConnection,
    query,
    transaction
};
