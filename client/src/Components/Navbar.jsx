import React, { useState } from 'react';
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';


function Navbar() {

    const [mobileNav, setmobileNav] = useState("hidden");

    return (
        <>
            <div className='flex bg-zinc-800 text-white md:px-8 md:py-4 px-4 py-2 items-center justify-between'>
                <div className=' flex items-center gap-2'>
                    <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="Book Logo" className='h-10' />
                    <NavLink to={"/"} className=' text-2xl font-semibold'>Bookheavean</NavLink>
                </div>
                <div className=' flex items-center gap-4'>
                    <div className=' hidden md:flex gap-4'>
                        <NavLink to={"/"} className=' hover:text-blue-400 transition-all duration-300'>Home</NavLink>
                        <NavLink to={"/all-books"} className=' hover:text-blue-400 transition-all duration-300'>All Books</NavLink>
                        <NavLink to={"/cart"} className=' hover:text-blue-400 transition-all duration-300'>Cart</NavLink>
                        <NavLink to={"/profile"} className=' hover:text-blue-400 transition-all duration-300'>Profile</NavLink>
                    </div>
                    <div className=' hidden md:flex gap-4'>
                        <NavLink to={"/signin"} className=' px-2 py-1 border border-blue-500 rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>SignIn</NavLink>
                        <NavLink to={"/signup"} className=' px-2 py-1 border bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</NavLink>
                    </div>
                </div>

                <button className=' text-white hover:text-zinc-500 text-4xl md:hidden' onClick={() => setmobileNav("block")} >
                    <IoReorderThreeOutline />
                </button>
            </div>
            <div className={`${mobileNav} bg-zinc-800 px-2 absolute h-screen w-3/6 md:hidden flex border-2 border-l-0 border-t-0 border-zinc-700 py-4 shadow-lg shadow-zinc-600`} >
                <div className=' flex flex-col w-full gap-5 px-5 py-3 bg-zinc-800 text-white rounded-b-xl z-40 text-xl '>
                    <NavLink to={"/"} className=' hover:text-blue-400 transition-all ' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}>Home</NavLink>
                    <NavLink to={"/all-books"} className=' hover:text-blue-400 transition-all ' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}>All Books</NavLink>
                    <NavLink to={"/cart"} className=' hover:text-blue-400 transition-all ' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}>Cart</NavLink>
                    <NavLink to={"/profile"} className=' hover:text-blue-400 transition-all ' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}>Profile</NavLink>
                    <NavLink to={"/signin"} className=' px-2 py-1 border border-blue-500 rounded hover:text-zinc-800 text-center hover:bg-white transition-all ' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}>SignIn</NavLink>
                    <NavLink to={"/signup"} className=' px-2 py-1 border bg-blue-500 rounded text-center hover:bg-white hover:text-zinc-800 transition-all ' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}>SignUp</NavLink>
                </div>
                <button className=' text-white p-1 text-2xl h-5 hover:text-gray-500' onClick={() => mobileNav === "hidden" ? setmobileNav("block") : setmobileNav("hidden")}><RxCross2 /></button>
            </div>
        </>
    )
}

export default Navbar
