import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from './BookCard';
import { Hourglass } from "react-loader-spinner"

function RecentlyAdded() {

    const [Data, setData] = useState([]);
    const [loader, setloader] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`/api/v1//get-recent-books`);
            setData(response.data.books);
            setloader(false);
        }
        fetch();
    }, [])

    return (
        <div className=' md:mt-8 px-4'>
            <h4 className=' text-3xl text-yellow-100'>Recently added books</h4>
            {
                loader && <div className=' w-full flex justify-center items-center p-10 h-96 z-10 '>
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

            {!loader && <div className=' my-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
                {
                    Data
                    && Data.map((items, i) => (
                        <div key={i} className=''>
                            <BookCard data={items} />
                        </div>
                    ))
                }
            </div>}
        </div>
    )
}

export default RecentlyAdded
