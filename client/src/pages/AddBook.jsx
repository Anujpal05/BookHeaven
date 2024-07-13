import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddBook() {
    const navigate = useNavigate();
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id")
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        try {
            const bookInfo = {
                url: data.url,
                title: data.title,
                desc: data.desc,
                price: data.price,
                author: data.author,
                language: data.language,
            }

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/add-book`, bookInfo, { headers });
            toast.success(response.data.message);
            navigate("/all-books")
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className=" bg-zinc-900 min-h-screen py-10 md:py-0 h-auto">
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-zinc-800 flex flex-col justify-center p-5 gap-5 rounded-xl w-full shadow-sm shadow-zinc-500 '>
                <h1 className=' text-3xl text-center font-semibold  text-zinc-400'>Add New Book</h1>
                <div className=' flex flex-col space-y-2  '>
                    <label className=' text-zinc-100 text-sm'>Image Url</label>
                    <input placeholder='Enter book image url' name='url' className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type="text" {...register("url", { required: true })} />
                    {errors.url && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className=' flex flex-col space-y-2 '>
                    <label className=' text-zinc-100 text-sm'>Book Title</label>
                    <input placeholder='Enter book title' name='title' className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type='text' {...register("title", { required: true })} />
                    {errors.title && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className=' flex flex-col space-y-2 '>
                    <label className=' text-zinc-100 text-sm'>Book Author</label>
                    <input placeholder='Enter author name' name='author' className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type='text' {...register("author", { required: true })} />
                    {errors.author && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className='flex justify-between md:gap-10 gap-2'>
                    <div className=' flex flex-col space-y-2 w-7/12 '>
                        <label className=' text-zinc-100 text-sm'>Language</label>
                        <input placeholder='Enter book language' name='language' className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type='text' {...register("language", { required: true })} />
                        {errors.language && <span className=' text-red-400 text-sm'>This field is required</span>}
                    </div>
                    <div className=' flex flex-col space-y-2 w-2/5 '>
                        <label className=' text-zinc-100 text-sm'>Price</label>
                        <input placeholder='Enter Book Price' className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' name='price' type='number' {...register("price", { required: true })} />
                        {errors.price && <span className=' text-red-400 text-sm'>This field is required</span>}
                    </div>
                </div>
                <div className=' flex flex-col space-y-2 '>
                    <label className=' text-zinc-100 text-sm'>Book Description</label>
                    <textarea rows={4} placeholder='Enter book description' className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' name='desc' type='text' {...register("desc", { required: true })} />
                    {errors.desc && <span className=' text-red-400 text-sm'>This field is required</span>}
                </div>
                <div className='flex justify-center w-full'>
                    <button type='submit' className='outline-none bg-blue-500 p-2 font-semibold text-lg text-zinc-900 rounded-md hover:bg-blue-600  transition-all duration-500'>Add Book</button>
                </div>
            </form>
        </div>

    )
}

export default AddBook
