import React from 'react'
import { NavLink } from 'react-router-dom'

function Hero() {
    return (
        <div className=' md:h-[75vh] h-[80vh] flex flex-col md:flex-row z-10 '>
            <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center order-2 md:order-1 md:gap-5'>
                <h1 className=' text-4xl lg:text-6xl text-yellow-100 font-semibold text-center lg:text-left'>Descover Your Next Great Read</h1>
                <p className=' mt-4 text-zinc-300 text-xl text-center lg:text-left'>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
                <div className='mt-8'>
                    <NavLink to={"/all-books"} className=' text-yellow-100 px-7 py-2 rounded-full border border-yellow-100 font-semibold text-center text-xl lg:text-2xl hover:bg-zinc-800'>Discover Books</NavLink>
                </div>
            </div>
            <div className='w-full lg:w-3/6 h-auto lg:h-5/6 mb-10 flex items-center justify-center order-1 md:order-2'>
                <img src='./hero.png' alt='hero' className=' h-full' />
            </div>

        </div>

    )
}

export default Hero
