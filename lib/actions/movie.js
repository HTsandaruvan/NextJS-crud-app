"use server";
import connectDB from "@/lib/mongodb"; // Import correctly
import { ObjectId } from "mongodb";

// Create movie server action
export const createMovie = async (movie) => {
  try {
    const db = await connectDB(); // ✅ Use the database instance directly

    const result = await db.collection("movies-new").insertOne(movie);

    console.log(`A movie was inserted with the _id: ${result.insertedId}`);

    return result.acknowledged ? { success: true } : { success: false };
  } catch (error) {
    console.error("Mongodb insert failed!", error);
    return { success: false, error };
  }
};

// Update movie server action
export const updateMovie = async (id, movie) => {
  try {
    const db = await connectDB(); // ✅ Use the database instance directly

    const result = await db.collection("movies-new").updateOne(
      { _id: new ObjectId(id) }, // ✅ Correct way to convert ID
      { $set: movie },
      { upsert: true }
    );

    console.log(`A movie was updated with the _id: ${result.upsertedId}`);

    return result.acknowledged ? { success: true } : { success: false };
  } catch (error) {
    console.error("Mongodb update failed!", error);
    return { success: false, error };
  }
};

// Delete movie server action
export const deleteMovie = async (id) => {
  try {
    const db = await connectDB(); // ✅ Use the database instance directly

    const result = await db
      .collection("movies-new")
      .deleteOne({ _id: new ObjectId(id) });

    console.log(`Movie was deleted: ${result.deletedCount}`);

    return result.acknowledged ? { success: true } : { success: false };
  } catch (error) {
    console.error("Mongodb delete failed!", error);
    return { success: false, error };
  }
};
