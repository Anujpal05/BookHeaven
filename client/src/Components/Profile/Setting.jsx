import axios from 'axios'
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Hourglass } from "react-loader-spinner";

function Setting() {

    const [userData, setuserData] = useState();
    const [Value, setValue] = useState({ address: "" });
    const [loader, setloader] = useState(true);

    const headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        id: localStorage.getItem('id')
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`/api/v1/get-user-data`, { headers });
                setuserData(response.data.userData);
                setValue({ address: response.data.userData.address });
                setloader(false)
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue({ ...Value, [name]: value });

    };


    const updateAddress = async () => {
        try {
            const response = await axios.put(`/api/v1///update-address`, Value, { headers });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            {loader && <div className=' w-full h-[80vh] flex justify-center items-center '>
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

            {
                userData && <div className='  py-6 min-h-[70vh] h-auto w-auto '>
                    <h1 className=' text-zinc-400 text-4xl font-semibold'>Settings</h1>
                    < div className=' flex  items-center py-9 space-x-16'>
                        <div className=' flex flex-col gap-2' >
                            <p className=' text-zinc-200 font-semibold'>Username</p>
                            <p className=' bg-zinc-800 text-zinc-400 p-2 text-md rounded-md font-semibold text-center'>{userData.username}</p>
                        </div>
                        <div className=' flex flex-col gap-2' >
                            <p className=' text-zinc-200 font-semibold'>Email</p>
                            <p className=' bg-zinc-800 text-zinc-400 p-2 px-4 text-md rounded-md font-semibold text-center'>{userData.email}</p>
                        </div>
                    </div >
                    <div className='  space-y-2'>
                        <label className=' text-xl text-zinc-400 ' >Address</label>
                        <textarea name="address" className='  bg-zinc-800 w-full outline-none p-4' rows={4} value={Value.address} onChange={handleChange} ></textarea>
                    </div>
                    <div className=' flex justify-center items-center w-full py-2'>
                        <button className=' p-2 rounded-md text-zinc-900 font-semibold text-md bg-blue-500 hover:bg-blue-600 transition-all duration-300' onClick={updateAddress}>Update</button>
                    </div>
                </div>
            }
        </>

    )
}

export default Setting
