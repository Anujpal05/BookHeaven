import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard';
import { Hourglass } from "react-loader-spinner"
import star from "../../assets/star.png"
import toast from 'react-hot-toast';

function Favourites() {
    const [favouriteBooks, setfavouriteBooks] = useState();
    const [loader, setloader] = useState(true);
    const headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        id: localStorage.getItem('id')
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`/api/v1/get-all-fav-books`, { headers });
                setfavouriteBooks(response.data.favouriteBooks);
                setloader(false);
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetch();
    }, [favouriteBooks]);


    return (
        <div className=''>
            {
                loader && <div className=' w-full flex justify-center items-center p-10 h-[85vh] '>
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
            {
                favouriteBooks && favouriteBooks.length == 0 && <div className=' flex flex-col justify-center items-center h-auto md:h-[85vh] gap-5 '>
                    <h1 className=' text-3xl md:text-5xl text-zinc-500 font-semibold'>No favourite books</h1>
                    <img src={star} alt="star" className=' h-20 md:h-24' />
                </div>
            }
            {favouriteBooks && favouriteBooks.length > 0 && <> <h1 className=' text-3xl text-zinc-500 font-semibold'>Your Favourite Books</h1>
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grids-cols-3 lg:grid-cols-3 gap-6 mt-10'>
                    {favouriteBooks.map((items, i) => (
                        <div key={i}><BookCard data={items} favourite={true} /></div>
                    ))}
                </div></>}
        </div>
    )
}

export default Favourites
