//keep this as a server component
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import React from 'react'
import RegisterForm from './RegisterForm'
import { redirect } from "next/navigation"

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (session) {
        redirect("/dashboard")
    }
    return (
        <div
            id="Home"
            className="min-h-screen h-[100vh] md:h-[100vh] lg:h-[100vh] xl:h-[100vh]"><RegisterForm /></div>
    )
}

export default page