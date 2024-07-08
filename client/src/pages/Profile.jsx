import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Hourglass } from "react-loader-spinner"
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

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
                const response = await axios.get("http://localhost:4000/api/v1/get-user-data", { headers });
                setProfile(response.data.userData);
                setloader(false)
            } catch (error) {
                console.log(error)
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
            <div className=' bg-zinc-900  flex flex-col md:flex-row text-white pt-24 py-6 px-10 gap-10 w-fit min-w-full min-h-screen'>
                {
                    Profile && <><div className=' w-full md:h-screen lg:w-1/6 md:w-1/4'>
                        <Sidebar data={Profile} />
                    </div>
                        <div className=' w-full lg:w-5/6 md:w-3/4'>
                            <Outlet />
                        </div></>
                }
            </div>
        </>
    )
}

export default Profile