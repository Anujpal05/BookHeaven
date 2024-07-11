import React from 'react';
import { RxCross1 } from "react-icons/rx";

function SeeUserDetails({ userDiv, setuserDiv, userDivData }) {
    return (
        <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-30 text-zinc-200`}>
            {userDivData && <div className={` ${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
                <div className=' bg-zinc-950 w-[80%] md:w-[50%] lg:w-[40%] p-3 rounded-md space-y-3 text-lg text-zinc-200 flex flex-col items-start '>
                    <div className=' flex justify-between items-center w-full'>
                        <h1 className='text-3xl text-zinc-400'>User Information</h1>
                        <button className=' outline-none text-red-500 hover:text-red-800 transition-all duration-300 ' onClick={() => setuserDiv("hidden")}><RxCross1 />
                        </button>
                    </div>
                    <div>
                        <label htmlFor="">
                            Username :{" "}
                            <span>{userDivData.username}</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            Email :{" "}
                            <span>{userDivData.email}</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            Address :{" "}
                            <span>{userDivData.address}</span>
                        </label>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default SeeUserDetails
