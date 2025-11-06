const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Log every request for debugging
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Secure headers
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

// Enable CORS
// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// JSON parsing
app.use(express.json());

app.get('/test', (req, res) => {
  console.log('✅ Test route hit');
  res.send('Test route works!');
});
// Rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200,
//   standardHeaders: true,
//   legacyHeaders: false,
//   handler: (req, res) => {
//     res.status(429).json({ message: 'Too many requests, please try again later.' });
//   },
// });
// app.use(limiter);

app.use((req, res, next) => {
  console.log("➡️ Received:", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`⬅️ ${req.method} ${req.url} => ${res.statusCode}`);
  });
  next();
});




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => res.send('API with MySQL is running'));

module.exports = app;
