
import mysql from 'mysql2';
import dotenv from 'dotenv'

// Might cause problem in the hosting
dotenv.config();

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT,
}).promise();

export default db;
