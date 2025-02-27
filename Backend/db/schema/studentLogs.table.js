import db from '../db.connect.js';

const createStudent_logs = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS student_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,  -- Keep user_id but no FK
  rfid_tag VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  section VARCHAR(50) NOT NULL,
  log_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  time_in TIME DEFAULT NULL,
  time_out TIME DEFAULT NULL,
  LRN VARCHAR(50) DEFAULT NULL;
  UNIQUE (user_id, log_date)  -- Ensures one log per user per day
  );`;

  try {
    await db.query(query);
    console.log("✅ Student logs table created successfully.");
  } catch (error) {
    console.error("❌ Error creating student logs table:", error);
  }
};

export default createStudent_logs;
