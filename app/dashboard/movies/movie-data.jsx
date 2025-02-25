'use client'

import { getMovies } from '@/lib/apis/server';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import MovieTable from './movie-table';

const MovieData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const result = await getMovies();
            console.log("Movies from MongoDB:", result); // Debugging Output

            // ✅ Extract movies correctly
            if (result?.movies && result.movies.length > 0) {
                const refinedMovies = result.movies.map((movie) => ({
                    id: movie._id.toString(),
                    title: movie.title,
                    year: movie.year,
                    plot: movie.plot,
                    rated: movie.rated,
                    genres: movie.genres,
                    poster: movie.poster,
                    imdb: movie.imdb?.rating || "N/A", // ✅ Extract only imdb.rating
                }));
                setMovies(refinedMovies);
            } else {
                setError("No movies found");
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            setError("Failed to fetch movies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMovies(); // Fetch movies on initial load
    }, []);


    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[186.5px]">
                <Loader2 width={60} height={60} className="animate-spin duration-1000 text-[100px] text-purple-600" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-[186.5px]">
                <p className="text-red-700 font-medium">{error}</p>
            </div>
        );
    }

    // Render the MovieTable component with the movies data
    return <MovieTable movies={movies} refreshData={fetchMovies} />;
};

export default MovieData;