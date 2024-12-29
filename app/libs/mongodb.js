import { MongoClient, ServerApiVersion } from "mongodb";

const clientPromise = () => {
  const MONGODB_URI =
    "mongodb+srv://first:QEfqw2dTIJDe6X2P@clusterfirst.tg3xp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFirst";
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
