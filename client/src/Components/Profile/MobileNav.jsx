import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function MobileNav() {
    const role = useSelector((state) => state.auth.role);

    return (
        <div className='flex md:hidden flex-row gap-1 text-xl font-semibold  items-center w-full '>
            {role == "user" && <>
                <Link to={"/profile"} className=' hover:bg-zinc-950 bg-zinc-800 p-2 text-center rounded transition-all duration-300'>Favourites</Link>
                <Link to={"/profile/orderHistory"} className=' hover:bg-zinc-950  bg-zinc-800 p-2 text-center rounded transition-all duration-300'>Order History</Link>
                <Link to={"/profile/setting"} className=' hover:bg-zinc-950  bg-zinc-800 p-2 text-center rounded transition-all duration-300'>Setting</Link></>}
            {role == "admin" && <>
                <Link to={"/profile"} className=' hover:bg-zinc-950 bg-zinc-800 p-2 text-center rounded transition-all duration-300'>All Order</Link>
                <Link to={"/profile/add-book"} className=' hover:bg-zinc-950  bg-zinc-800 p-2 text-center rounded transition-all duration-300'>Add Book</Link>
            </>
            }
        </div>
    )
}

export default MobileNav
