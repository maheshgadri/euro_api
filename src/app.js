// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const matchRoutes = require('./routes/matchRoutes');

// const profileRoutes = require('./routes/profileRoutes');

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const preferencesRoutes = require('./routes/preferencesRoutes');

// const app = express();

// // Log every request for debugging
// app.use((req, res, next) => {
//   console.log(`➡️ ${req.method} ${req.url}`);
//   next();
// });

// // Secure headers
// // app.use(
// //   helmet({
// //     crossOriginResourcePolicy: false,
// //   })
// // );

// // Enable CORS
// // app.use(
// //   cors({
// //     origin: '*',
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ['Content-Type', 'Authorization'],
// //   })
// // );

// // JSON parsing
// app.use(express.json());

// app.get('/test', (req, res) => {
//   console.log('✅ Test route hit');
//   res.send('Test route works!');
// });
// // Rate limiter
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000,
// //   max: 200,
// //   standardHeaders: true,
// //   legacyHeaders: false,
// //   handler: (req, res) => {
// //     res.status(429).json({ message: 'Too many requests, please try again later.' });
// //   },
// // });
// // app.use(limiter);

// app.use((req, res, next) => {
//   console.log("➡️ Received:", req.method, req.url);
//   next();
// });

// app.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log(`⬅️ ${req.method} ${req.url} => ${res.statusCode}`);
//   });
//   next();
// });




// // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/users', userRoutes);
// // app.use('/api', matchRoutes);
// // // Default route
// // app.get('/', (req, res) => res.send('API with MySQL is running'));
// // // // app.use('/api/profile', profileRoutes);
// // // app.use('/uploads', express.static('uploads')); 
// // app.use('/api/preferences', preferencesRoutes);

// // app.use("/api/profile", require("./routes/profile"));

// // // Profile Uploads (photos + dp)
// // // app.use('/api/profile/upload', require('./routes/profileRoutes')); 


// // // app.use('/api/profile', profileRoutes);
// // app.use("/api/profile/upload", require("./routes/profilePicture"));
// // app.use('/uploads', express.static('uploads'));


// // Serve uploaded files
// app.use('/uploads', express.static('uploads'));

// // Upload DP
// app.use("/api/profile/upload", require("./routes/profilePicture"));

// // Upload photos (5 photos)
// app.use("/api/profile", profileRoutes);

// // AUTH + USERS + MATCH + PREFS
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use("/api/preferences", preferencesRoutes);
// app.use('/api', matchRoutes);





// module.exports = app;



const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const matchRoutes = require('./routes/matchRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');

const profileGetRoute = require('./routes/profile');          // GET profile
const profileUploadPhotos = require('./routes/profileRoutes'); // 5 photos
const profileDP = require('./routes/profilePicture');          // profile pic (DP)

// Enable JSON
app.use(express.json());

// Simple Request Logger
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`⬅️ ${req.method} ${req.url} => ${res.statusCode}`);
  });
  next();
});

// CORS
app.use(cors({ origin: '*' }));

// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*
|--------------------------------------------------------------------------
| ROUTES (ORDER IS IMPORTANT)
|--------------------------------------------------------------------------
*/

// 1️⃣ GET profile
// GET /api/profile/:id
app.use('/api/profile', profileGetRoute);

// 2️⃣ Upload Profile Picture (DP)
// POST /api/profile/upload/:id
app.use('/api/profile/upload', profileDP);

// 3️⃣ Upload multiple photos (5 images)
// POST /api/profile/:id
app.use('/api/profile', profileUploadPhotos);

// 4️⃣ AUTH / USERS / MATCH / PREFS
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api', matchRoutes);

// Test route
app.get('/', (req, res) => res.send('API is running successfully 🚀'));

module.exports = app;
