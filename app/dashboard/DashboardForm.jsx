"use client";

import React, { useEffect, useState } from 'react';
import HeroImageSlider from './HeroImageSlider';

import { getMovies } from '../libs/apis/server';

const DashboardForm = () => {
    const images = [
        {
            url: 'https://images.unsplash.com/photo-1719937050640-71cfd3d851be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8',
            caption: 'Welcome to the Adventure!',
        },
        {
            url: 'https://plus.unsplash.com/premium_photo-1675629519404-187e26d24194?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
            caption: 'Explore New Horizons',
        },
        {
            url: 'https://plus.unsplash.com/premium_photo-1733514692159-8817a8229ce0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
            caption: 'Discover the Unknown',
        },
        {
            url: 'https://images.unsplash.com/photo-1732888329753-0ff89467e6c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D',
            caption: 'The Journey Awaits',
        },
    ];
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
        <div className=" font-medium text-2xl m-6">
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
