"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import EditMovieForm from "./edit-movie-form";
import { updateMovie, deleteMovie } from "@/lib/actions/movie";
import DeleteMovieDialog from "./delete-movie-dialog";
import Image from "next/image";

export default function MovieTable({ movies, refreshData }) {
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [deletingMovie, setDeletingMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;
    const { toast } = useToast();

    useEffect(() => {
        setCurrentPage(1); // Reset pagination on new search
    }, [searchTerm, selectedGenre, selectedYear]);

    // Get unique genres and years for filtering
    const uniqueGenres = [...new Set(movies.flatMap((movie) => movie.genres))].filter(Boolean);
    const uniqueYears = [...new Set(movies.map((movie) => movie.year))].filter(Boolean).sort((a, b) => b - a);

    // Filter movies based on search input, genre, and year
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === "" || selectedGenre === "all" || movie.genres.includes(selectedGenre)) &&
        (selectedYear === "" || selectedYear === "all" || movie.year.toString() === selectedYear)
    );


    // Pagination Logic
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handleEditSubmit = async (movie) => {
        setIsSaving(true);
        const resp = await updateMovie(movie.id, movie);
        setIsSaving(false);

        if (resp?.success) {
            setEditingMovie(null);
            refreshData();
            toast({
                variant: "success",
                title: `${movie.title} was updated `,
                description: "The movie has been successfully updated.",
            });
        }
    };

    const handleDeleteConfirm = async (movieId) => {
        setDeleting(true);
        const resp = await deleteMovie(movieId);
        setDeleting(false);

        if (resp?.success) {
            setDeletingMovie(null);
            refreshData();
            toast({
                variant: "success",
                title: "Movie Deleted",
                description: "The movie has been successfully removed.",
            });
        }
    };

    return (
        <div className="p-4">
            {/* Search & Filter Bar */}
            <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
                <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md"
                />

                {/* Genre Filter */}
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Genres</SelectItem>
                        {uniqueGenres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                                {genre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Year Filter */}
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {uniqueYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="overflow-x-auto">
                <Table className="w-full border rounded-lg">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="font-bold"># Cover</TableHead>
                            <TableHead className="font-bold">Movie Title</TableHead>
                            <TableHead className="font-bold">Year</TableHead>
                            <TableHead className="font-bold">Rated</TableHead>
                            <TableHead className="font-bold">IMDb</TableHead>
                            <TableHead className="font-bold">Genres</TableHead>
                            <TableHead className="font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentMovies.length > 0 ? (
                            currentMovies.map((movie) => (
                                <TableRow key={movie.id} className="border-b">
                                    <TableCell>
                                        <Image
                                            src={movie.poster ?? "/images/avatar.jpg"}
                                            alt="Poster"
                                            width={60}
                                            height={90}
                                            className="w-16 h-auto rounded-md"
                                            priority
                                        />
                                    </TableCell>
                                    <TableCell>{movie?.title ?? "N/A"}</TableCell>
                                    <TableCell>{movie?.year ?? "N/A"}</TableCell>
                                    <TableCell>{movie?.rated ?? "N/A"}</TableCell>
                                    <TableCell>{movie?.imdb?.rating ?? "N/A"}</TableCell>
                                    <TableCell>{movie?.genres?.join(", ")}</TableCell>
                                    <TableCell className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingMovie(movie)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setDeletingMovie(movie)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className="text-center p-4">
                                    No movies found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Edit Movie Dialog */}
            {editingMovie && (
                <EditMovieForm
                    movie={editingMovie}
                    open={true}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setEditingMovie(null)}
                    isLoading={isSaving}
                />
            )}

            {/* Delete Movie Dialog */}
            {deletingMovie && (
                <DeleteMovieDialog
                    movie={deletingMovie}
                    open={true}
                    onCancel={() => setDeletingMovie(null)}
                    onConfirm={() => handleDeleteConfirm(deletingMovie?.id)}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
}
