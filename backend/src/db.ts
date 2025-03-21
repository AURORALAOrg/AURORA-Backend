import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("📦 Connected to the PostgreSQL database successfully!");
    client.release();
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export { pool, connectDB };
