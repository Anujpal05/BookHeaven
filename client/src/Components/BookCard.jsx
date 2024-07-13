import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BookCard = ({ data, favourite }) => {

    const removeFavouriteBook = async () => {
        try {
            const headers = {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                id: localStorage.getItem("id"),
                bookid: data._id
            }

            const response = await axios.put(`/api/v1/remove-fav-book`, {}, { headers });
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className=' bg-zinc-800 flex flex-col'>
            <Link to={`/view-book-details/${data._id}`}>
                <div className=' bg-zinc-800 rounded p-4 min-h-full '>
                    <div className=' flex justify-center bg-zinc-900'>
                        <div className=' bg-zinc-950 rounded flex justify-center items-center p-3 w-fit'>
                            <img src={data.url} alt='book' className=' h-[25vh]' />
                        </div>
                    </div>
                    <h2 className=' mt-4 text-lg font-semibold'>{data.title}</h2>
                    <p className=' mt-2  text-zinc-400 font-semibold'>{data.author}</p>
                    <p className=' mt-2 text-zinc-200 font-semibold text-xl'> &#8377; {data.price}</p>
                </div>
            </Link>
            {favourite && <button className=' bg-yellow-500 text-yellow-50 px-4 py-2 rounded mt-4 m-5' onClick={removeFavouriteBook}>Remove from favourite</button>}
        </div>
    )
}

export default BookCard
