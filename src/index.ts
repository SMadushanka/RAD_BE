import cors from 'cors';
import express from 'express';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import userRoutes from './routes/user';
import connectDB from './config/database';
import envConfig from './config/env';

const app = express();
const PORT = envConfig.PORT;

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','x-access-token','Accept','Origin','X-Requested-With'],
  exposedHeaders: ['Authorization'],
  credentials: true,
}));
// Serve static uploads from BackEnd/uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
