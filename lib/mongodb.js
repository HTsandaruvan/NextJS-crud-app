import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Global client cache to prevent multiple connections
let cachedDb = null;

const connectDB = async () => {
  if (!cachedDb) {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedDb = client.db("sample_mflix"); // Get the DB instance
  }
  return cachedDb;
};

export default connectDB;
