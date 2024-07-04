import React from 'react'
import Hero from '../Components/Hero'
import RecentlyAdded from '../Components/RecentlyAdded'

function Home() {
    return (
        <div className=' bg-zinc-900 text-white px-10 pt-24 pb-8'>
            <Hero />
            <div>
                <RecentlyAdded />
            </div>
        </div>
    )
}

export default Home
