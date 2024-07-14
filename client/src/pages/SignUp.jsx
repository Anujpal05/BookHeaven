import React from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import bgAuthImage from "../assets/bgAuth.png";
import toast from 'react-hot-toast';
import axios from 'axios';

function SignUp() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {

            const headers = {
                username: data.username,
                email: data.email
            }

            await axios.get(`${import.meta.env.VITE_SERVER_URL}/generate-otp`, { headers: headers });
            const Otp = await prompt("Enter Your Otp");

            if (Otp) {
                let userOtp = parseInt(Otp);

                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/verify-otp`, { userOtp });
                if (res.data.message) {
                    const userInfo = {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        address: data.address,
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
        <div className=" bg-zinc-900 flex justify-center items-center min-h-screen gap-56">
            <div className=' hidden lg:flex'>
                <img src={bgAuthImage} alt='Register' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-zinc-800 flex flex-col justify-center p-7 gap-4 rounded-xl w-full m-5 mt-20 md:w-3/12 shadow-sm shadow-zinc-500 '>
                <h1 className=' text-2xl text-center font-semibold  text-zinc-200'>SignUp</h1>
                <div className=' flex flex-col '>
                    <label className=' text-zinc-100 text-sm'>Username</label>
                    <input placeholder='username' name='username' className=' bg-zinc-700 px-2 py-1 text-zinc-200  outline-none rounded-md' type="text" {...register("username", { required: true })} />
                    {errors.username && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className=' flex flex-col '>
                    <label className=' text-zinc-100 text-sm'>Email</label>
                    <input placeholder='email' name='email' className=' bg-zinc-700 px-2 py-1 text-zinc-200  outline-none rounded-md' type='email' {...register("email", { required: true })} />
                    {errors.email && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className=' flex flex-col '>
                    <label className=' text-zinc-100 text-sm'>Password</label>
                    <input placeholder='password' className=' bg-zinc-700 px-2 py-1 text-zinc-200  outline-none rounded-md' type='password' {...register("password", { required: true })} />
                    {errors.password && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className=' flex flex-col '>
                    <label className=' text-zinc-100 text-sm'>Address</label>
                    <textarea rows={4} placeholder='address' className=' bg-zinc-700 px-2 py-1 text-zinc-200  outline-none rounded-md' type='text' {...register("address", { required: true })} />
                    {errors.address && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <button type='submit' className=' bg-blue-500 p-1 font-semibold text-xl text-white rounded-md hover:bg-blue-600 hover:text-zinc-200 transition-all duration-500' >SignUp</button>
                <div className=' flex flex-col '>
                    <p className=' text-center text-zinc-100 font-semibold'>Or</p>
                    <p className=' text-zinc-600 font-semibold text-center'>Already have an account? <Link to={"/signin"} className=' underline hover:text-blue-500 transition-all duration-300'>LogIn</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp
