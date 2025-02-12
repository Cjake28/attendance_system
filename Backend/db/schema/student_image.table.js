import db from '../db.connect.js';

const createStudent_imageTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS student_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- Link directly to user_id
    image LONGBLOB NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES students(user_id) ON DELETE CASCADE
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
