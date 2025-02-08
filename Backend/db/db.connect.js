import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables safely
try {
    dotenv.config();
} catch (error) {
    console.warn("⚠️ dotenv could not be loaded. Ensure environment variables are set.");
}

// Create MySQL connection pool
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306, // Default MySQL port
    timezone: 'Asia/Manila', // 
    waitForConnections: true,
    connectionLimit: 10, // Limit concurrent connections
    queueLimit: 0,
}).promise();

// Test the database connection
(async () => {
    try {
        const [rows] = await db.query("SELECT 1"); // Simple query to check connection
        console.log("✅ Connected to MySQL Database");
    } catch (error) {
        console.error("❌ MySQL Connection Failed:", error);
        process.exit(1); // Exit process if DB connection fails
    }
})();

export default db;
