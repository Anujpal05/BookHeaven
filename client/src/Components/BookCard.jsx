import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ data }) => {
    return (
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
    )
}

export default BookCard
