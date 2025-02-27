"use server";
import connectDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Create movie server action
export const createMovie = async (movie) => {
  try {
    const db = await connectDB();

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
    const db = await connectDB();

    const result = await db.collection("movies-new").updateOne(
      { _id: new ObjectId(id) }, // convert ID
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
    const db = await connectDB();

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
export const searchMovies = async (query) => {
  try {
    const db = await connectDB();

    const filters = {};
    if (query.title) {
      filters.title = { $regex: query.title, $options: "i" }; // Case-insensitive search
    }
    if (query.year) {
      filters.year = parseInt(query.year);
    }
    if (query.genres) {
      filters.genres = { $in: query.genres.split(",") };
    }

    // Fetch movies
    const movies = await db.collection("movies").find(filters).toArray();

    // Convert MongoDB ObjectId to string
    const formattedMovies = movies.map((movie) => ({
      ...movie,
      _id: movie._id.toString(), // Convert ObjectId to a string
    }));

    return { success: true, data: formattedMovies };
  } catch (error) {
    console.error("Movie search failed!", error);
    return { success: false, error };
  }
};

// Get total movies count
export const getTotalMoviesCount = async () => {
  try {
    const db = await connectDB();
    const count = await db.collection("movies-new").countDocuments();
    console.log("count", count);

    return { success: true, count };
  } catch (error) {
    console.error("Failed to fetch total movies count!", error);
    return { success: false, error };
  }
};
