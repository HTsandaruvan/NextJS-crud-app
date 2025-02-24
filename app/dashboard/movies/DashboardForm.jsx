import { Suspense } from "react";


import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import MovieData from './movie-data';

const DashboardForm = () => {
    //TODO:
    return (
        <div className="mx-auto">
            <div className=' flex justify-end'><Link href="/movies"> <Button
                variant="outline"
                className="hover:border-green-300 hover:bg-green-100/30"
            >
                <Eye />
                View as User
            </Button></Link></div>
            <Card>
                <CardHeader>
                    <CardTitle>Movies Management</CardTitle>
                    <CardDescription>
                        View and manage all the listed movie entries.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/*  */}
                    <Suspense

                    >
                        <MovieData />
                    </Suspense>

                </CardContent>
            </Card>


        </div>
    );
};

export default DashboardForm;
