'use client'
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GENRES, RATINGS } from "@/lib/constants";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MultiSelect } from "@/components/multi-select";
import { createMovie } from "@/lib/actions/movie";
import { useRouter } from "next/navigation";

const currentYear = new Date().getFullYear();

const AddMovieForm = () => {
    const [genres, setGenres] = useState([]);
    const [rated, setRated] = useState("");
    const [errors, setErrors] = useState({});
    const { toast } = useToast();
    const router = useRouter();

    const genresList = GENRES.map((genre) => ({
        label: genre,
        value: genre,
    }));

    const [isLoading, setLoading] = useState(false);

    const validateForm = (data) => {
        let newErrors = {};

        if (!data.title.trim()) newErrors.title = "Title is required.";
        if (!data.plot.trim()) newErrors.plot = "Plot is required.";

        if (!data.year || isNaN(data.year) || data.year < 1900 || data.year > currentYear) {
            newErrors.year = `Year must be between 1900 and ${currentYear}.`;
        }

        if (!data.rated) newErrors.rated = "Rating is required.";

        if (!data.genres.length) newErrors.genres = "At least one genre is required.";

        if (!data.imdb || isNaN(data.imdb) || data.imdb < 0 || data.imdb > 10) {
            newErrors.imdb = "IMDb rating must be between 0.0 and 10.0.";
        }

        const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif|svg))$/i;
        if (!data.poster || !urlPattern.test(data.poster)) {
            newErrors.poster = "Valid poster URL is required (png, jpg, jpeg, webp, gif, svg).";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const movieData = {
            title: formData.get("title")?.toString(),
            year: Number(formData.get("year")),
            plot: formData.get("plot")?.toString(),
            rated,
            genres,
            poster: formData.get("poster")?.toString(),
            imdb: Number(formData.get("imdb")),
        };

        if (!validateForm(movieData)) return;

        setLoading(true);
        const resp = await createMovie(movieData);
        setLoading(false);

        if (resp?.success) {
            toast({ title: "Success!", description: "Movie added successfully.", variant: "success" });
            router.push('/dashboard/movies');
        } else {
            toast({ title: "Error", description: "Failed to add movie.", variant: "destructive" });
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add Movie</CardTitle>
                <CardDescription>Add a movie to the Mflix database.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitForm}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="title">Movie Title</Label>
                        <Input id="title" name="title" placeholder="Enter the movie title" />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="year">Movie Year</Label>
                        <Input id="year" name="year" type="number" placeholder="Enter the year" />
                        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
                    </div>

                    <div>
                        <Label htmlFor="plot">Movie Plot</Label>
                        <Textarea id="plot" name="plot" placeholder="Enter the movie plot" />
                        {errors.plot && <p className="text-red-500 text-sm">{errors.plot}</p>}
                    </div>

                    <div>
                        <Label htmlFor="genres">Movie Genres</Label>
                        <MultiSelect
                            list={genresList}
                            placeholder="Select movie genres"
                            selectedItems={genres}
                            onValueChange={setGenres}
                            className="border-none"
                        />
                        {errors.genres && <p className="text-red-500 text-sm">{errors.genres}</p>}
                    </div>

                    <div>
                        <Label htmlFor="rated">Movie Rated</Label>
                        <Select onValueChange={setRated}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a rating" />
                            </SelectTrigger>
                            <SelectContent>
                                {RATINGS.map((rating) => (
                                    <SelectItem key={rating} value={rating}>
                                        {rating}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.rated && <p className="text-red-500 text-sm">{errors.rated}</p>}
                    </div>

                    <div>
                        <Label htmlFor="imdb">IMDb Rating</Label>
                        <Input id="imdb" name="imdb" type="number" max="10" step="0.1" placeholder="Enter IMDb rating" />
                        {errors.imdb && <p className="text-red-500 text-sm">{errors.imdb}</p>}
                    </div>

                    <div>
                        <Label htmlFor="poster">Poster URL</Label>
                        <Input id="poster" name="poster" type="text" placeholder="Enter the poster URL" />
                        {errors.poster && <p className="text-red-500 text-sm">{errors.poster}</p>}
                    </div>
                </CardContent>

                <CardFooter className="w-full flex justify-end space-x-2">
                    <Button type="reset" variant="outline">
                        Clear Form
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin" />} Add Movie
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default AddMovieForm;
