import createUsersTable from './users.table.js';
import createStudentTable from './student.tables.js';
import createStudent_imageTable from './student_image.table.js';

const initTables = async () => {
  try {
    console.log("🔧 Initializing database tables...");
    
    await createUsersTable();
    await createStudentTable();
    await createStudent_imageTable();
    
    console.log("✅ All tables initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing tables:", error);
    throw error; // Ensures the caller (server startup) knows there was a failure
  }
};

export default initTables;
