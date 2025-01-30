import db from '../db.connect.js';

const createStudentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    parent_email VARCHAR(100),
    rfid_tag VARCHAR(50) UNIQUE, 
    grade_level VARCHAR(20),
    section VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
  `;

  try {
    await db.query(query);
    console.log("✅ student table created successfully.");
  } catch (error) {
    console.error("❌ Error creating student table:", error);
  }
};

export default createStudentTable;
