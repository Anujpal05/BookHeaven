import React from 'react'
import { Link } from 'react-router-dom'

function MobileNav() {
    return (
        <div className='flex md:hidden flex-row justify-between text-xl font-semibold items-center w-full '>
            <Link to={"/profile"} className=' hover:bg-zinc-950 bg-zinc-800 p-2   text-center rounded transition-all duration-300'>Favourites</Link>
            <Link to={"/profile/orderHistory"} className=' hover:bg-zinc-950  bg-zinc-800 p-2 text-center rounded transition-all duration-300'>Order History</Link>
            <Link to={"/profile/setting"} className=' hover:bg-zinc-950  bg-zinc-800 p-2 text-center rounded transition-all duration-300'>Setting</Link>
        </div>
    )
}

export default MobileNav
