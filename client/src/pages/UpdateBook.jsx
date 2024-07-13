import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Hourglass } from "react-loader-spinner"
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdateBook() {
    const navigate = useNavigate();
    const [loader, setloader] = useState(true);
    const { id } = useParams();
    const [bookData, setbookData] = useState({
        url: "",
        title: "",
        desc: "",
        price: "",
        author: "",
        language: ""
    })

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id"),
        bookid: id
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`/api/v1/get-book/${id}`, { headers });
                setbookData(response?.data?.book);
                setloader(false);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, []);

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

            const response = await axios.put(`/api/v1/update-book`, { bookInfo }, { headers });
            toast.success(response.data.message);
            navigate(`/all-books`)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setbookData({ ...bookData, [name]: value })
    }


    return (
        <>
            {
                loader && <div className=' w-full flex justify-center items-center p-10 min-h-screen bg-zinc-900 '>
                    <Hourglass
                        visible={loader}
                        height="90"
                        width="90"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    />
                </div>
            }

            {!loader && bookData && <div className=" bg-zinc-900 min-h-screen h-auto pt-24 p-5 md:p-16">
                <form className=' bg-zinc-800 flex flex-col justify-center p-5 gap-5 rounded-xl w-full shadow-sm shadow-zinc-500 '>
                    <h1 className=' text-3xl text-center font-semibold  text-zinc-400'>Update Book</h1>
                    <div className=' flex flex-col space-y-2  '>
                        <label className=' text-zinc-100 text-sm'>Image Url</label>
                        <input placeholder='Enter book image url' name='url' value={bookData.url} className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type="text" onChange={handleChange} />
                        {/* {errors.url && <span className=' text-red-400 text-sm'>This field is required</span>} */}
                    </div>
                    <div className=' flex flex-col space-y-2 '>
                        <label className=' text-zinc-100 text-sm'>Book Title</label>
                        <input placeholder='Enter book title' name='title' value={bookData.title} className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type='text' onChange={handleChange} />
                        {/* {errors.title && <span className=' text-red-400 text-sm'>This field is required</span>} */}
                    </div>
                    <div className=' flex flex-col space-y-2 '>
                        <label className=' text-zinc-100 text-sm'>Book Author</label>
                        <input placeholder='Enter author name' name='author' value={bookData.author} className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type='text' onChange={handleChange} />
                        {/* {errors.author && <span className=' text-red-400 text-sm'>This field is required</span>} */}
                    </div>
                    <div className='flex justify-between gap-3 md:gap-10'>
                        <div className=' flex flex-col space-y-2 w-7/12 '>
                            <label className=' text-zinc-100 text-sm'>Language</label>
                            <input placeholder='Enter book language' name='language' value={bookData.language} className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' type='text' onChange={handleChange} />
                            {/* {errors.language && <span className=' text-red-400 text-sm'>This field is required</span>} */}
                        </div>
                        <div className=' flex flex-col space-y-2 w-2/5 '>
                            <label className=' text-zinc-100 text-sm'>Price</label>
                            <input placeholder='Enter Book Price' value={bookData.price} className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' name='price' type='number' onChange={handleChange} />
                            {/* {errors.price && <span className=' text-red-400 text-sm'>This field is required</span>} */}
                        </div>
                    </div>
                    <div className=' flex flex-col space-y-2 '>
                        <label className=' text-zinc-100 text-sm'>Book Description</label>
                        <textarea rows={4} placeholder='Enter book description' value={bookData.desc} className=' bg-zinc-900  px-2 py-2 text-zinc-200  outline-none rounded-md' name='desc' type='text' onChange={handleChange} />
                        {/* { <span className=' text-red-400 text-sm'>This field is required</span>} */}
                    </div>
                    <div className='flex justify-center w-full'>
                        <button type='submit' className='outline-none bg-blue-500 p-2 font-semibold text-lg text-zinc-900 rounded-md hover:bg-blue-600  transition-all duration-500' onClick={onSubmit}>Update Book</button>
                    </div>
                </form>
            </div>
            }

        </>
    )
}

export default UpdateBook
