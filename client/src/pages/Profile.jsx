import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

function Profile() {
    const [Profile, setProfile] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/get-user-data", { headers });
                setProfile(response.data.userData)
            } catch (error) {
                console.log(error)
            }
        }

        fetch();
    }, [])


    return (
        <div className=' bg-zinc-900 h-screen flex flex-col md:flex-row text-white pt-24 py-6 px-10 gap-10'>
            {
                Profile && <><div className=' w-full lg:w-1/6 md:w-1/4'>
                    <Sidebar data={Profile} />
                </div>
                    <div className=' w-full lg:w-5/6 md:w-3/4'>
                        <Outlet />
                    </div></>
            }
        </div>
    )
}

export default Profile