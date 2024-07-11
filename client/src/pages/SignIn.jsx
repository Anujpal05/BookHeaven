import React from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import bgAuthImage from "../assets/bgAuth.png";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';


function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        try {
            const userInfo = {
                username: data.username,
                password: data.password
            }

            const response = await axios.post("http://localhost:4000/api/v1/signin", userInfo);
            toast.success("LogIn Successfully!");
            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role))
            navigate('/profile');

            localStorage.setItem("id", response.data.id);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("token", response.data.token);

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className=" bg-zinc-900 flex justify-center items-center min-h-screen md:gap-20 lg:gap-56">
            <div className=' hidden md:flex' >
                <img src={bgAuthImage} alt='Login' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-zinc-800 flex flex-col justify-center p-7 gap-4 rounded-xl w-full m-5 mt-20 lg:w-3/12 md:w-9/12 shadow-sm shadow-zinc-500 '>
                <h1 className=' text-2xl text-center font-semibold  text-zinc-200'>SignIn</h1>
                <div className=' flex flex-col '>
                    <label className=' text-zinc-100 text-sm'>Username</label>
                    <input placeholder='username' name='username' className=' bg-zinc-700 px-2 py-1 text-zinc-200  outline-none rounded-md' type="text" {...register("username", { required: true })} />
                    {errors.username && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className=' flex flex-col '>
                    <label className=' text-zinc-100 text-sm'>Password</label>
                    <input placeholder='password' className=' bg-zinc-700 px-2 py-1 text-zinc-200  outline-none rounded-md' type='password' {...register("password", { required: true })} />
                    {errors.password && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <button type='submit' className=' bg-blue-500 p-1 font-semibold text-xl text-white rounded-md hover:bg-blue-600 hover:text-zinc-200 transition-all duration-500'>SignIn</button>
                <div className=' flex flex-col '>
                    <p className=' text-center text-zinc-100 font-semibold'>Or</p>
                    <p className=' text-zinc-600 font-semibold text-center'>Don't have an account? <Link to={"/signup"} className=' underline hover:text-blue-500 transition-all duration-300'>SignUp</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignIn
