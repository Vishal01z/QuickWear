import mysql from "mysql2/promise";
import 'dotenv/config';
import db from "../config/db.js"; // ✅ NOT: { db }

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default pool; // Changed to default export