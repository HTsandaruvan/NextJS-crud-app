"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
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
    const { toast } = useToast()


    const handleEdit = (movie) => {
        setEditingMovie(movie);
    };
    const [isClient, setIsClient] = useState(false);


    const handleEditSubmit = async (movie) => {
        const { id, title, year, plot, rated, genres, poster, imdb } = movie;
        setIsSaving(true);
        const resp = await updateMovie(id, {
            title,
            year,
            plot,
            rated,
            genres,
            poster,
            imdb,
        });
        setIsSaving(false);
        if (resp?.success) {
            setEditingMovie(null);
            refreshData(); // Re-fetch data after update
        }
    };

    const handleDelete = (movie) => {
        setDeletingMovie(movie);
    };

    const handleDeleteConfirm = async (movieId) => {
        setDeleting(true);
        const resp = await deleteMovie(movieId);
        setDeleting(false);

        if (resp?.success) {
            setDeletingMovie(null);
            refreshData(); // Re-fetch data after delete
            toast({
                variant: "success",
                title: "Verify Your Email",
                description: "A verification email has been sent.",
            });
        }
    };
    useEffect(() => {
        setIsClient(true);
    }, []);


    return (
        <div>
            {isClient ? <div>Client-only content</div> : <div>Loading...</div>}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold"># Cover</TableHead>
                        <TableHead className="font-bold">Movie Title</TableHead>
                        <TableHead className="font-bold">Year</TableHead>
                        <TableHead className="font-bold">Rated</TableHead>
                        <TableHead className="font-bold">IMDb</TableHead>
                        <TableHead className="font-bold">Genres</TableHead>
                        <TableHead className="font-bold text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie) => (
                        <TableRow key={movie.id}>
                            <TableCell>
                                <Image
                                    src={movie.poster ?? "/images/avatar.jpg"}
                                    alt="Poster"
                                    width={80}
                                    height={160}
                                    className="w-20 h-auto aspect-auto"
                                    priority
                                />
                            </TableCell>
                            <TableCell>{movie?.title ?? "N/A"}</TableCell>
                            <TableCell>{movie?.year ?? "N/A"}</TableCell>
                            <TableCell>{movie?.rated ?? "N/A"}</TableCell>
                            <TableCell>{movie?.imdb?.rating ?? "N/A"}</TableCell>
                            <TableCell>{movie?.genres?.join(", ")}</TableCell>
                            <TableCell>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="min-w-[120px]"
                                        onClick={() => handleEdit(movie)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="min-w-[120px]"
                                        onClick={() => handleDelete(movie)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {editingMovie && (
                <EditMovieForm
                    movie={editingMovie}
                    open={true}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setEditingMovie(null)}
                    isLoading={isSaving}
                />
            )}
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