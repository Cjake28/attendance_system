import createUsersTable from './users.table.js';
import createStudentTable from './student.tables.js';
import createStudent_imageTable from './student_image.table.js';
import createStudent_logs from './studentLogs.table.js'
import addColumnToStudentLogs from './addColumn.js'
import addColumnToStudentLog from './addColumnstudentLogs.js'

const initTables = async () => {
  try {
    console.log("🔧 Initializing database tables...");
    
    await createUsersTable();
    await createStudentTable();
    await createStudent_imageTable();
    await createStudent_logs();
    // await addColumnToStudentLogs();
    // await addColumnToStudentLog();
    console.log("✅ All tables initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing tables:", error);
    throw error; // Ensures the caller (server startup) knows there was a failure
  }
};

export default initTables;
