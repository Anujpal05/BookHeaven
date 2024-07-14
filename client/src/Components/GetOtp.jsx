import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";

function GetOtp({ otpDiv, setotpDiv, otpDivData }) {
    const [Value, setvalue] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setvalue(parseInt(value));
    }

    useEffect(() => {
        const fetch = async () => {
            const headers = {
                username: otpDivData.username,
                email: otpDivData.email
            }

            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/generate-otp`, { headers: headers });
            toast.success(res.data.message);
        }
        fetch();
    }, [otpDivData]);


    const submit = async () => {
        try {
            if (Value) {
                const userOtp = Value;
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/verify-otp`, { userOtp });
                if (res.data.message) {
                    const userInfo = {
                        username: otpDivData.username,
                        email: otpDivData.email,
                        password: otpDivData.password,
                        address: otpDivData.address,
                    }

                    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/signup`, userInfo);
                    toast.success("SignUp successfully!")
                    navigate("/signin");
                } else {
                    toast.error("Wrong OTP! Try again!");
                }
            } else {
                toast.error("Try Again!");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Server Error!");
        }
    }

    return (
        <div className={`${otpDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-90 text-zinc-200`}>
            {otpDivData && <div className={` ${otpDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
                <div className=' bg-zinc-950 w-[80%] md:w-[50%] lg:w-[40%] p-3 rounded-md space-y-4 text-lg text-zinc-200 flex flex-col items-start '>
                    <div className=' flex justify-between items-center w-full'>
                        <h1 className='text-3xl text-zinc-400 font-semibold '>Enter OTP</h1>
                        <div className=' outline-none text-red-500 hover:text-red-800 transition-all duration-300 ' onClick={() => setotpDiv("hidden")}><RxCross1 />
                        </div>
                    </div>
                    <h3>OTP is sent on your email Id {otpDivData.email}</h3>
                    <div className="flex  flex-col mx-1">
                        <label htmlFor="" className='font-semibold'>Enter OTP  </label>
                        <input type="number" name='otp' className='text-black outline-none rounded-md  p-1 bg-zinc-300' value={Value} onChange={handleChange} />
                    </div>
                    <div className='px-2'>
                        <div className=' bg-blue-500 p-1 text-black font-semibold rounded-md cursor-pointer' onClick={submit}>Verify OTP</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default GetOtp
