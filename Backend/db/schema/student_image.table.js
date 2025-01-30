import db from '../db.connect.js';

const createStudent_imageTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS student_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    image LONGBLOB NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
    );
  `;

  try {
    await db.query(query);
    console.log("✅ student images table created successfully.");
  } catch (error) {
    console.error("❌ Error creating student images table:", error);
  }
};

export default createStudent_imageTable;
