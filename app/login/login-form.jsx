"use client";
import React, { useState } from "react";
//import { loginUser } from "@/lib/apis/server";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Loader2 } from "lucide-react";
const DEFAULT_ERROR = {
    error: false,
    message: "",
};
const LoginForm = () => {
    const [isLoading, setLoading] = useState(false)
    const { toast } = useToast()

    const [error, setError] = useState(DEFAULT_ERROR);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setemailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const validateForm = () => {
        if (!email) {
            setemailError("Email is required");
            return false;
        } else {
            setemailError("");
        }
        if (!password) {
            setPasswordError("Password is required");
            return false;
        } else {
            setPasswordError("");
        }

        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            // Login Form Data Submission
            // const login = await loginUser({ email: email, password: password });
            setLoading(true)

            await signIn.email(
                {
                    email,
                    password,
                },
                {
                    onSuccess: () => {
                        toast({
                            variant: "success",
                            title: "Welcome Back",
                            description: "Login Successfully.",
                        });
                        redirect("/dashboard");
                    },
                    onError: (ctx) => {
                        setError({ error: true, message: ctx.error.message });
                    },
                }
            );
            setLoading(false)

            setEmail("");
            setPassword("");

        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="lg:w-[380px] md:w-[380px] sm:w-[320px] mx-auto sm:mx-[5px]  ">

                <div className="bg-white border border-gray-200 shadow-md p-4 rounded-lg">
                    <form onSubmit={handleSubmit} action={""} className="space-y-6">
                        <h1 className="text-start text-xl font-bold text-gray-900">
                            Sign in to your account
                        </h1>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="bg-gray-50 border border-gray-300 text-gray-900   block w-full p-1.5 rounded-md"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                required=""
                            />
                            {emailError && (
                                <div className="text-red-500 text-sm p-1.5">{emailError}</div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5 rounded-md"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="xxxxxxx"
                                required=""
                            />
                            {passwordError && (
                                <div className="text-red-500 text-sm p-1.5">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                        <div>{error?.error && <span className='text-sm font-bold text-red-500 flex justify-center text-center animate-pulse duration-1000'> {error.message}</span>}</div>

                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" />
                                </div>
                                <div className="text-sm ml-2">
                                    <label
                                        htmlFor="remember"
                                        className="font-medium text-gray-900"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <a
                                href="/reset-password"
                                className="text-sm text-blue-700 hover:underline"
                            >
                                Forgot password
                            </a>
                        </div>
                        <div className="flex items-center ">
                            <button
                                type="submit"
                                className="w-full text-white bg-[#45a29e] hover:bg-[#45a29e]/90 transition-all focus-visible:ring-4 ring-2 focus:ring-blue-300 px-5 py-1.5 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="animate-spin mr-2" />}
                                <span>Sign in</span>
                            </button>
                        </div>                       <div className="flex text-sm font-medium text-gray-500 space-x-1 justify-center">
                            <span>Don’t have an account yet? </span>
                            <a
                                className="text-sm text-blue-700 hover:underline"
                                href="/register"
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
