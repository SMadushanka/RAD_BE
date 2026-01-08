import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export const envConfig = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT || '10', 10),
};

// Lightweight runtime warnings for missing critical configuration
if (!envConfig.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI is not set. Database connection will fail until configured.');
}
if (!envConfig.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET is not set. Token generation/verification will fail until configured.');
}

export default envConfig;
