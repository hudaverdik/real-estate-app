import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.POSTGRESQL_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL server');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL server', err);
  } finally {
    await client.end();
    console.log('Client disconnected');
  }
}

testConnection();
