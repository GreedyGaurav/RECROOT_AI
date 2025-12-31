import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // Increased timeout for DNS resolution
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000, // Connection timeout
      retryWrites: true,
      retryReads: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      cached.promise = null;
      console.error('❌ MongoDB connection error:', error.message);
      
      // Provide helpful error messages
      if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
        console.error('💡 DNS resolution failed. Check your MONGODB_URI connection string.');
        console.error('💡 For MongoDB Atlas, ensure your connection string format is:');
        console.error('   mongodb+srv://username:password@cluster.mongodb.net/database');
        console.error('💡 Also verify your IP is whitelisted in MongoDB Atlas Network Access.');
      } else if (error.message.includes('authentication failed')) {
        console.error('💡 Authentication failed. Check your username and password in MONGODB_URI.');
      } else if (error.message.includes('timeout')) {
        console.error('💡 Connection timeout. Check your network connection and MongoDB Atlas status.');
      }
      
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 