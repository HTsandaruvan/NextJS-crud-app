"use client";

import React, { useEffect, useState } from 'react';
import { getMovies } from '../libs/apis/server';

const DashboardForm = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getMovies();
                console.log("Movies from MongoDB:", result);
                if (result?.movies) {
                    setMovies(result.movies);  // Set movies data from the API
                } else {
                    setError(result?.message || "Something went wrong!");
                }
            } catch (error) {
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);  // Stop loading after the data is fetched
            }
        };

        fetchMovies();  // Call the async function to fetch movies
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="text-black container font-medium text-2xl m-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-red-200">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie._id} className="h-96 bg-green-400">
                            {movie.title}
                        </div>
                    ))
                ) : (
                    <div>No movies found</div>
                )}
            </div>
        </div>
    );
};

export default DashboardForm;
