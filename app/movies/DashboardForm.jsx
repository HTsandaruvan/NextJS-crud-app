"use client";

import React, { useEffect, useState } from "react";
import { getMovies } from "@/lib/apis/server";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookDashed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardForm = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(8);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getMovies();
                console.log("Movies from MongoDB:", result);
                if (result?.movies) {
                    setMovies(result.movies);
                } else {
                    setError(result?.message || "Something went wrong!");
                }
            } catch (error) {
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter((movie) => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
            movie.title.toLowerCase().includes(lowerCaseTerm) ||
            movie.year.toString().includes(lowerCaseTerm) ||
            (movie.genres && movie.genres.join(" ").toLowerCase().includes(lowerCaseTerm))
        );
    });

    // Pagination Logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
                <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Loading Movies...</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} className="h-[480px] rounded-lg shadow-md" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Browse Movies</h1>
                <Link href="/dashboard/movies">
                    <Button variant="outline" className="hover:border-secondary-300 hover:bg-secondary-100/30 flex items-center gap-2">
                        <BookDashed />
                        Go to Dashboard
                    </Button>
                </Link>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title, year, or genres"
                    className="border rounded-lg p-2 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full my-6">
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie) => (
                        <div key={movie._id} className="hover:scale-[1.05] transition-transform duration-300">
                            <Card className="h-full shadow-lg rounded-xl bg-white overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg flex flex-wrap items-center">
                                        {movie.title}{" "}
                                        <span className="text-sm text-neutral-500 ml-1">{`(${movie.year})`}</span>
                                    </CardTitle>
                                    <CardDescription className="sr-only">{movie.plot}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    {/* Movie Poster */}
                                    <div className="flex justify-center bg-black w-full h-[220px] mb-4 rounded-lg overflow-hidden">
                                        <Image
                                            className="h-full w-auto object-contain"
                                            src={movie?.poster}
                                            alt={movie?.title}
                                            width={200}
                                            height={400}
                                            priority={true}
                                        />
                                    </div>

                                    {/* Movie Info */}
                                    <div className="flex flex-col h-[154px] justify-between">
                                        <p className="text-sm text-gray-700 line-clamp-3">{movie?.plot}</p>
                                        <div className="text-[#45a29e] text-sm font-semibold">
                                            {movie?.genres?.length && movie?.genres?.join(" / ")}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Badge variant="success" className="px-3 py-1">
                                                Rated: {movie?.rated ?? "N/A"}
                                            </Badge>
                                            <div className="flex items-center space-x-1 text-sm font-semibold">
                                                <FaStar className="text-yellow-400 text-lg" title="IMDB Rating" />
                                                <span>{movie?.imdb?.rating ?? 0}/10</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="px-6 pb-4 flex justify-end">
                                    <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600 transition-all">
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-600">No movies found.</div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="mr-2 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="ml-2 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DashboardForm;
