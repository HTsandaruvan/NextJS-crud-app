"use client";

import React, { useEffect, useState } from 'react';

import { getMovies } from '@/lib/apis/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { FaStar } from "react-icons/fa";


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
    //TODO:
    return (
        <div className="mx-auto">
            <h1 className=' text-2xl font-medium text-sky-500 py-2'>Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {movies.length > 0 ? (
                    movies.map((movie) => (

                        <div key={movie._id} className="h-[480px] hover:scale-105 duration-500  transition-all">

                            <Card className='h-full shadow-md shadow-slate-50'>
                                <CardHeader>
                                    <CardTitle className="space-x-1">{movie.title}<span className='text-sm text-neutral-400'>{` (${movie?.year})`}</span> </CardTitle>
                                    <CardDescription className='sr-only'>{movie.plot}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className='flex justify-center bg-black w-full h-[220px] mb-4 rounded'>
                                        <Image className='h-full w-auto object-contain' src={movie?.poster} alt={movie?.title} width={200} height={400} priority={true} />
                                    </div>
                                    <div className="flex flex-col h-[154px] justify-between">
                                        <p className='line-clamp-3'>{movie?.plot}</p>
                                        <div className='text-[#45a29e] text-sm font-semibold'>
                                            {movie?.genres?.length && movie?.genres?.join(" / ")}
                                        </div>
                                        <div className='flex justify-between'>
                                            <div><Badge variant='success' >Rated: {movie?.rated ?? "N/A"}</Badge></div>

                                            <div className=' space-x-1 font-semibold flex'>
                                                <div className='text-[20px] text-yellow-400 '>
                                                    <FaStar title='IMDB Rating' />
                                                </div>
                                                <div>{movie?.imdb?.rating ?? 0}/10</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
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
