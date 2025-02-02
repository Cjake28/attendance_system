import db from '../db.connect.js';

const createStudent_logs = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS student_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    rfid_tag VARCHAR(50) NOT NULL,
    log_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- FIXED
    loged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, log_date),
    FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE
);

  `;

  try {
    await db.query(query);
    console.log("✅ Student logs table created successfully.");
  } catch (error) {
    console.error("❌ Error creating student logs table:", error);
  }
};

export default createStudent_logs;
