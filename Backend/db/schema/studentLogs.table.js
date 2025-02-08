import db from '../db.connect.js';

const createStudent_logs = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS student_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    rfid_tag VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    log_date DATE NOT NULL DEFAULT (CURRENT_DATE), -- Stores only the date
    time_in TIME DEFAULT NULL,  -- Stores the time-in
    time_out TIME DEFAULT NULL, -- Stores the time-out
    UNIQUE (student_id, log_date),
    FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE
);`;

  try {
    await db.query(query);
    console.log("✅ Student logs table created successfully.");
  } catch (error) {
    console.error("❌ Error creating student logs table:", error);
  }
};

export default createStudent_logs;
