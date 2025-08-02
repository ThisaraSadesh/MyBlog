import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// --- Mongoose connection for models ---
let isConnected = false;
export async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Mongoose connected successfully');
  } catch (error) {
    console.error('Mongoose connection error:', error);
    throw error;
  }
}

// --- MongoClient promise for NextAuth ---
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise };
