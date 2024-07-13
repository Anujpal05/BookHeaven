import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { Hourglass } from "react-loader-spinner"
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function ViewBookDetails() {
    const { id } = useParams();
    const [Data, setData] = useState();
    const [loader, setloader] = useState(true);
    const isLogin = useSelector((state) => state.auth.isLogin);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id"),
        bookid: id
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`/api/v1/get-book/${id}`);
                setData(response.data.book);
                setloader(false);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])

    const handleFavourites = async () => {
        try {
            const response = await axios.put(`/api/v1/add-fav-book`, {}, { headers });
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleCart = async () => {
        try {
            const response = await axios.put(`/api/v1/add-to-cart`, {}, { headers });
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleDelete = async () => {
        try {
            if (confirm("Are you sure to delete this book?")) {
                const response = await axios.delete(`/api/v1/delete-book`, { headers });
                toast.success(response.data.message)
                navigate('/all-books');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className=' bg-zinc-900 px-8 md:px-12 py-24 flex flex-col md:flex-row gap-4 text-white min-h-[90vh]'>
                {
                    loader && <div className=' w-full flex justify-center items-center p-10 h-96 '>
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

                {Data &&
                    <>
                        <div className='    w-full md:w-3/6 flex justify-around items-center'>
                            <div className='bg-zinc-800 p-4 rounded flex flex-col md:flex-row justify-evenly w-full'>
                                <div className=' md:p-5 bg-zinc-900 flex justify-center'>
                                    <img src={Data.url} alt='book' />
                                </div>
                                {isLogin && role === "user" && <div className=" flex md:flex-col md:justify-normal justify-between gap-8 text-4xl px-4 md:mt-0 mt-4">
                                    <button className=' text-red-500 hover:text-red-600 hover:bg-zinc-200 transition-all duration-300 outline-none bg-zinc-100 rounded-full p-3 text-center' onClick={handleFavourites}><FaHeart /></button>
                                    <button className=' text-zinc-100 hover:text-zinc-300 hover:bg-blue-600 transition-all duration-300 outline-none bg-blue-500 rounded-full p-3' onClick={handleCart}><FaShoppingCart /></button>
                                </div>}
                                {isLogin && role === "admin" && <div className=" flex md:flex-col md:justify-normal justify-between gap-8 text-4xl px-4 md:mt-0 mt-4">
                                    <button className='  text-zinc-100 hover:text-zinc-300 hover:bg-blue-700 transition-all duration-300 outline-none bg-blue-500 rounded-full p-3 text-center' onClick={() => navigate(`/update-book/${id}`)}><MdEdit /></button>
                                    <button className=' text-white-100 hover:text-zinc-200   transition-all duration-300 outline-none bg-red-500 rounded-full p-3 hover:bg-red-700' onClick={handleDelete}><MdDelete /></button>
                                </div>}
                            </div>

                        </div>
                        <div className=' w-full md:w-3/6 md:p-4'>
                            <h1 className=' text-4xl text-zinc-400 font-semibold'>{Data.title}</h1>
                            <p className=' text-zinc-400 mt-1 '>{Data.author}</p>
                            <p className=' text-zinc-500 text-xl mt-4'>{Data.desc}</p>
                            <p className=' text-zinc-400 mt-4 flex items-center gap-2'><GrLanguage />
                                {Data.language}</p>
                            <p className=' text-zinc-100 mt-4 text-2xl font-semibold'>Price: &#8377; {Data.price}</p>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default ViewBookDetails
