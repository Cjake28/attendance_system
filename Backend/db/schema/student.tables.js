import db from '../db.connect.js';

const createStudentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
    user_id INT PRIMARY KEY,  -- No student_id, just use user_id
    parent_email VARCHAR(100),
    rfid_tag VARCHAR(50) UNIQUE,
    section VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );`
  
  ;

  try {
    await db.query(query);
    console.log("✅ student table created successfully.");
  } catch (error) {
    console.error("❌ Error creating student table:", error);
  }
};

export default createStudentTable;
