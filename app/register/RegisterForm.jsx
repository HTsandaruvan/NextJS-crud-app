"use client";
import { useRouter } from "next/navigation"; // Import Next.js router
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import React, { useState } from "react";
import { signUp } from "@/lib/auth-client";

const DEFAULT_ERROR = {
    error: false,
    message: "",
};

const RegisterForm = () => {
    const router = useRouter(); // Next.js Router for redirection
    const [error, setError] = useState(DEFAULT_ERROR);
    const [isLoading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        const name = formData.get("name").toString() ?? "";
        const email = formData.get("email").toString() ?? "";
        const password = formData.get("password").toString() ?? "";
        const confirmPassword = formData.get("confirm-password") ?? "";

        // Validation Logic
        if (!name.trim()) {
            setError({ error: true, message: "Name is required." });
            return;
        }

        if (!email.trim()) {
            setError({ error: true, message: "Email is required." });
            return;
        }

        if (!password) {
            setError({ error: true, message: "Password is required." });
            return;
        }

        if (password !== confirmPassword) {
            setError({ error: true, message: "Passwords do not match." });
            return;
        }

        setError(DEFAULT_ERROR);
        setLoading(true);

        try {
            const { data, error } = await signUp.email(
                {
                    email,
                    password,
                    name,
                    image: undefined,
                },
                {
                    onError: (ctx) => {
                        if (ctx) {
                            setError({ error: true, message: ctx.error.message });
                        }
                    },
                }
            );

            if (error || data?.error) {  // ✅ Proper error handling
                setError({ error: true, message: error?.message || data?.error });
                return;  // ✅ Stop execution if there is an error
            }

            // ✅ Show success toast
            toast({
                variant: "success",
                title: "Account created",
                description: "Your account has been successfully created.",
                action: (
                    <ToastAction className="bg-green-600 hover:bg-green-600/90" altText="Close">
                        <Link href="/login">Login</Link>
                    </ToastAction>
                ),
            });

            // ✅ Redirect to login page after a delay
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            setError({ error: true, message: "Something went wrong. Please try again." });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="lg:w-[380px] md:w-[380px] sm:w-[320px] mx-auto sm:mx-[5px] bg-white/90">
                <CardHeader>
                    <CardTitle className="text-xl">Create an account</CardTitle>
                    <CardDescription>Enter your information to get started</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitForm}>
                    <CardContent>
                        <div className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="name@example.com" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" placeholder="Enter new password" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input type="password" id="confirm-password" name="confirm-password" placeholder="Enter password again" />
                            </div>

                            {error.error && (
                                <span className="text-sm font-bold text-red-500 flex justify-center text-center animate-pulse duration-1000">
                                    {error.message}
                                </span>
                            )}

                            <div className="flex justify-center gap-1 text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button className="flex-1" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            Register
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterForm;
