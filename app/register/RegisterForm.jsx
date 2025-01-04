'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
//keep this as a client component


import React, { useState } from 'react'

const DEFAULT_ERROR = {
    error: false,
    message: "",
};
const RegisterForm = () => {
    const [error, setError] = useState(DEFAULT_ERROR);
    const handleSubmitForm = async (event) => {
        event?.preventDefault();
        const formData = new FormData(event?.currentTarget)

        const name = formData.get("name") ?? "";
        const email = formData.get("email") ?? "";
        const password = formData.get("password") ?? "";
        const confirmPassword = formData.get("confirm-password") ?? "";

        console.log("submitted", { name, email, password, confirmPassword })

        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                console.log("passwords match")
                setError(DEFAULT_ERROR)
            } else {
                setError({ error: true, message: "Passwords do not match." })
            }
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Card className='w-[380px] mx-auto  bg-blue-50/90'>
                <CardHeader>
                    <CardTitle>
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
                                <Input id="name" name="name" placeholder="Jone Doe" />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="name@example.com" />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" placeholder="Enter new password" />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input type="password" id="confirm-password" name="confirm-password" placeholder="Enter password again" />
                            </div>
                            <div>{error?.error && <span className='text-sm text-red-500'> {error.message}</span>}</div>
                            <div className='flex justify-center gap-1'>
                                Already have an account? <Link href="/login" className='text-blue-600 hover:underline'>Login</Link>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='flex-1' type='submit' >Register</Button>
                    </CardFooter>
                </form>
            </Card>

        </div>
    )
}

export default RegisterForm