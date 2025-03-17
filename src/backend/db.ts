import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
     user: "postgres",
     password: process.env.DB_PASSWORD,
     host: "localhost",
     port: 5432,
     database: "todo_db"
     });






export default db;
