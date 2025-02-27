import db from '../db.connect.js';

const addColumnToStudentLog = async () => {
  const query = `
    ALTER TABLE student_logs
    ADD COLUMN LRN VARCHAR(50) DEFAULT NULL;  -- Example column
  `;

  try {
    await db.query(query);
    console.log("✅ Column added to student_logs successfully.");
  } catch (error) {
    console.error("❌ Error adding column to student_logs:", error);
  }
};

export default addColumnToStudentLog;
