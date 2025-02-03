require("dotenv").config();

import { MongoClient } from "mongodb";

const clientPromise = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const options = {};

  if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const client = new MongoClient(MONGODB_URI, options);
  return client.connect();
};

export default clientPromise;
