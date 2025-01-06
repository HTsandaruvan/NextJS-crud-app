'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from "lucide-react"

import Link from 'next/link'
//keep this as a client component

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"


import React, { useState } from 'react'
import { registerUser } from '../libs/apis/server'

const DEFAULT_ERROR = {
    error: false,
    message: "",
};
const RegisterForm = () => {
    const [error, setError] = useState(DEFAULT_ERROR);
    const [isLoading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmitForm = async (event) => {
        event?.preventDefault();
        const formElement = event.currentTarget;

        const formData = new FormData(event?.currentTarget)

        const name = formData.get("name").toString() ?? "";
        const email = formData.get("email").toString() ?? "";
        const password = formData.get("password").toString() ?? "";
        const confirmPassword = formData.get("confirm-password") ?? "";


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
        const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        const passwordValidation = {
            minLength: 8,
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /[0-9]/,
            specialCharacter: /[@$!%*?&]/,
        };

        // Name Validation
        if (!name) {
            setError({ error: true, message: "Name is required." });
            return;
        }

        if (!nameRegex.test(name)) {
            setError({ error: true, message: "Name can only contain letters and spaces." });
            return;
        }

        // Email Validation
        if (!email) {
            setError({ error: true, message: "Email is required." });
            return;
        }

        if (!emailRegex.test(email)) {
            setError({ error: true, message: "Invalid email format." });
            return;
        }

        // Password Validation
        if (confirmPassword !== null && (password !== confirmPassword)) {
            setError({ error: true, message: "Passwords do not match." });
            return;
        }

        if (password.length < passwordValidation.minLength) {
            setError({ error: true, message: `Password must be at least ${passwordValidation.minLength} characters long.` });
            return;
        }

        if (!passwordValidation.uppercase.test(password)) {
            setError({ error: true, message: "Password must contain at least one uppercase letter." });
            return;
        }

        if (!passwordValidation.lowercase.test(password)) {
            setError({ error: true, message: "Password must contain at least one lowercase letter." });
            return;
        }

        if (!passwordValidation.number.test(password)) {
            setError({ error: true, message: "Password must contain at least one number." });
            return;
        }

        if (!passwordValidation.specialCharacter.test(password)) {
            setError({ error: true, message: "Password must contain at least one special character (@, $, !, %, *, ?, &)." });
            return;
        }

        // If all validations pass
        console.log("All validations passed");
        setError(DEFAULT_ERROR);
        setLoading(true)

        // Send to backend
        const registerResponse = await registerUser({ name, email, password });
        setLoading(false)
        if (registerResponse?.error) {
            setError({ error: true, message: registerResponse.error });
        } else {
            toast({
                variant: "success",
                title: "Account created",
                description: "Your account has been successfully created.",
                action: <ToastAction className="bg-green-600 hover:bg-green-600/90" altText="Close"><Link href={"/login"}>Login</Link></ToastAction>,
            });
            // Reset the form
            formElement.reset();
        }

    }

    return (
        <div className=' min-h-screen flex items-center justify-center'>
            <Card className='w-[380px] mx-auto  bg-white/90'>
                <CardHeader>
                    <CardTitle className="text-xl">
                        Create an account
                    </CardTitle>
                    <CardDescription>
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitForm}>
                    <CardContent>
                        <div className='flex flex-col space-y-5'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Jone Doe" className={`${error?.error && error?.message.includes("Name") ? "border-3 border-red-600" : ""}`} />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="name@example.com" className={`${error?.error && error?.message.includes("Email") ? "border-3 border-red-600" : ""}`} />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" placeholder="Enter new password" className={`${error?.error && error?.message.includes("Password") ? "border-3 border-red-600" : ""}`} />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input className={`${error?.error && error?.message.includes("Passwords do not match") ? "border-3 border-red-600" : ""}`} type="password" id="confirm-password" name="confirm-password" placeholder="Enter password again" />
                            </div>
                            <div>{error?.error && <span className='text-sm font-bold text-red-500'> {error.message}</span>}</div>
                            <div className='flex justify-center gap-1 text-sm'>
                                Already have an account? <Link href="/login" className='text-blue-600 hover:underline'>Login</Link>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='flex-1' type='submit' disabled={isLoading}> {isLoading && <Loader2 className="animate-spin" />}
                            Register</Button>
                    </CardFooter>
                </form>
            </Card>

        </div>
    )
}

export default RegisterForm