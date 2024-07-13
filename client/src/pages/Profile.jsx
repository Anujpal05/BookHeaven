import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Hourglass } from "react-loader-spinner"
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Profile/Sidebar';
import MobileNav from '../Components/Profile/MobileNav';
import toast from 'react-hot-toast';

function Profile() {
    const [Profile, setProfile] = useState();
    const [loader, setloader] = useState(true);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`/api/v1/get-user-data`, { headers });
                setProfile(response.data.userData);
                setloader(false)
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])


    return (
        <>
            {!Profile &&
                <div className=' w-full flex justify-center items-center h-screen bg-zinc-900 '>
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
            <div className=' bg-zinc-900  flex flex-col md:flex-row text-white pt-24 py-6 md:px-10 px-4 gap-10 w-fit max-w-full overflow-x-hidden min-w-full min-h-screen'>
                {
                    Profile && <><div className=' w-full md:h-screen lg:w-1/6 md:w-1/4'>
                        <Sidebar data={Profile} />
                    </div>
                        <div className=' w-full lg:w-5/6 md:w-3/4'>
                            <div className=' flex md:hidden w-screen mb-3'><MobileNav /></div>
                            <Outlet />
                        </div></>
                }
            </div>
        </>
    )
}

export default Profile