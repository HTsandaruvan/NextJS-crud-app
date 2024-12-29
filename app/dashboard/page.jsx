import React from 'react'
import DashboardForm from './DashboardForm'
import Carousel from './HeroImageSlider'

const page = () => {
    return (
        <div className='container min-h-screen'>
            <div className=' py-10 my-3 items-center h-screen'>
                <Carousel />
                <DashboardForm />
            </div>
        </div>
    )
}

export default page