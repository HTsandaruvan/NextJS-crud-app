import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

const clientPromise = () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const client = new MongoClient(MONGODB_URI, options);
  return client.connect();
};

export default clientPromise;
