import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";

function Sidebar({ data }) {
    return (
        <div className=' bg-zinc-800 p-4 md:h-full flex flex-col md:justify-between items-center  md:items-center rounded '>
            <div className=' flex flex-col justify-center items-center'>
                <img src={data.avatar} className=' h-[12vh]' />
                <p className=' mt-2 text-xl text-zinc-100'>{data.username}</p>
                <p className=' mt-1 text-md text-zinc-300 '>{data.email}</p>
                <div className=' h-[1px] bg-zinc-500 w-full mt-4'></div>
            </div>
            <div className=' flex flex-col justify-center items-center'>
                <Link to={"/profile"} className=' hover:bg-zinc-900 w-full px-4 py-2 mt-2 text-center rounded transition-all duration-300'>Favourites</Link>
                <Link to={"/profile/orderHistory"} className=' hover:bg-zinc-900 w-full py-2 px-4 mt-2 text-center rounded transition-all duration-300'>Order History</Link>
                <Link to={"/profile/setting"} className=' hover:bg-zinc-900 w-full py-2 px-4 mt-2 text-center rounded transition-all duration-300'>Setting</Link>
            </div>
            <div className=' mt-5'>
                <button className=' flex justify-center items-center gap-2 text-md font-semibold bg-zinc-900 px-10 md:px-5  py-2 rounded hover:bg-zinc-100 hover:text-zinc-800 transition-all duration-300 '>Log Out <MdOutlineLogout className=' text-xl' /></button>
            </div>
        </div>
    )
}

export default Sidebar
