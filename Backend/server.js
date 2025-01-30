import { app } from './app.js';
import initTables from './db/schema/initTables.js';

const PORT = process.env.PORT || 9220;

(async () => {
  try {
    console.log("🔧 Initializing database...");
    await initTables();
    console.log("✅ Database tables initialized successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to initialize tables:", err);
    process.exit(1); // Exit process if table creation fails
  }
})();
