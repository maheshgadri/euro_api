require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('✅ MySQL connected');

    // Sync models safely (no alter, no force)
    // Creates tables if they don't exist
    await sequelize.sync({ alter: true });
    console.log('📦 Database synced successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();
