import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Hourglass } from "react-loader-spinner"
import BookCard from '../Components/BookCard';
import toast from 'react-hot-toast';

function AllBook() {

    const [Data, setData] = useState([]);
    const [loader, setloader] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/get-all-books`);
                setData(response.data.books);
                setloader(false);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])

    return (
        <>   <div className=' md:px-10 px-6 py-14 bg-zinc-900 h-auto text-white min-h-screen'>
            {loader && <div className=' w-full mt-52 flex justify-center items-center '>
                <Hourglass
                    visible={loader}
                    height="100"
                    width="100"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
            </div>}
            {!loader && (
                <>
                    <h4 className=' text-4xl text-yellow-100 pt-5 text-center font-semibold'>All Books</h4>
                    <div className=' my-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {
                            Data
                            && Data.map((items, i) => (
                                <div key={i} className=''>
                                    <BookCard data={items} />
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
        </>
    )
}

export default AllBook
