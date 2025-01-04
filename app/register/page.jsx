//keep this as a server component

import React from 'react'
import RegisterForm from './RegisterForm'

const page = () => {
    return (
        <div
            id="Home"
            className="min-h-screen h-[100vh] md:h-[100vh] lg:h-[100vh] xl:h-[100vh]"><RegisterForm /></div>
    )
}

export default page