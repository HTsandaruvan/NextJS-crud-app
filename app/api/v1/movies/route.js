import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export const GET = async () => {
  try {
    const db = await connectDB(); // Get the database instance

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    console.log("Fetched Movies:", movies); // Debugging

    return NextResponse.json({ movies });
  } catch (error) {
    console.error("MONGODB ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
