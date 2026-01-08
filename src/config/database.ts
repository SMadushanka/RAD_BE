import mongoose from 'mongoose';
import envConfig from './env';

export const connectDB = async () => {
  const uri = envConfig.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not configured. Set it in .env and restart the server.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      // useNewUrlParser/useUnifiedTopology are no-ops in newer mongoose versions,
      // but providing options keeps backward compatibility for older installs.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useNewUrlParser: true,
      // @ts-ignore
      useUnifiedTopology: true,
    } as any);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
