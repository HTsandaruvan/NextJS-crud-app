import { MongoClient, ServerApiVersion } from "mongodb";

const clientPromise = () => {
  const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
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
