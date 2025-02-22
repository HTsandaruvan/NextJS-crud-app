// Movies related server action
"use server";

import clientPromise from "@/lib/mongodb";

export const createMovie = async (movie) => {
  try {
    const client = await clientPromise();

    // sample_mflix is the database name
    const db = client.db("sample_mflix");

    //create movie query
    const result = await db.collection("movies-new").insertOne(movie);
    console.log(`A movie was iserted with the _id: ${result.insertedId}`);
  } catch {
    console.log("Error inserting movie");
  }
};
