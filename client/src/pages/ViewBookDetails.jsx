import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { Hourglass } from "react-loader-spinner"


function ViewBookDetails() {
    const { id } = useParams();
    const [Data, setData] = useState();
    const [loader, setloader] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:4000/api/v1//get-book/${id}`);
            setData(response.data.book);
            setloader(false);
        }
        fetch();
    }, [])

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
                        <div className=' bg-zinc-800 p-4  rounded w-full md:w-3/6 flex justify-center items-center'>
                            <div className=' md:p-5 bg-zinc-900'>
                                <img src={Data.url} alt='book' />
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
