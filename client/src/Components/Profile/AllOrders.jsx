import React, { useEffect, useState } from 'react';
import axois from "axios";
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { Hourglass } from "react-loader-spinner"
import { FaCheck } from "react-icons/fa6";
import SeeUserDetails from './SeeUserDetails';
import toast from 'react-hot-toast';


function AllOrders() {

    const [AllOrders, setAllOrders] = useState();
    const [options, setoptions] = useState(-1);
    const [Values, setValues] = useState({ status: "" });
    const [loader, setloader] = useState(true);
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState();

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axois.get(`/api/v1/get-all-orders`, { headers });
                setAllOrders(response.data.data);
                setloader(false);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [AllOrders])

    const updateStatus = async (i) => {
        try {
            const id = AllOrders[i]._id;
            setoptions(-1);
            const response = await axois.put(`/api/v1/update-order/${id}`, Values, { headers });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const change = (e) => {
        const { value } = e.target;
        setValues({ status: value });
    }

    return (
        <div>

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

            {AllOrders && AllOrders.length > 0 && <div className=' md:p-4 p-1  space-y-8'>
                <h1 className=' text-4xl text-zinc-500 font-semibold'>All Order History</h1>
                <div className=' w-full bg-zinc-900 p-2 border-collapse'>

                    <div className=' w-full md:text-xl text-sm font-semibold text-zinc-200  text-center  border-[1px] border-zinc-700 border-collapse flex '>
                        <div className='flex justify-center items-center  border-[1px]  border-zinc-600 w-[5%]'>Sr.</div>
                        <div className=' p-2  flex justify-center items-center border-[1px]  border-zinc-600 w-[25%]'>Books</div>
                        <div className=' p-2  flex justify-center items-center border-[1px]  border-zinc-600 w-[33%]'>Description</div>
                        <div className=' p-2  flex justify-center items-center border-[1px]  border-zinc-600 w-[10%]'>Price</div>
                        <div className=' p-2  flex justify-center items-center border-[1px]  border-zinc-600 w-[20%] '>Status</div>
                        <div className=' p-2  flex justify-center items-center border-[1px]  border-zinc-600 w-[7%] text-center text-2xl'><FaUserLarge /></div>
                    </div>
                    <div className='  w-full border-collapse '>
                        {AllOrders && AllOrders.map((items, i) => (

                            <div key={i} className=" w-full flex text-[12px] h-fit md:text-sm  font-semibold  text-zinc-300 text-center  border-zinc-600">
                                <div className='p-2  flex justify-center items-center border-[1px]  border-zinc-600  w-[5%]'>{i + 1}</div>
                                <div className='p-2  flex justify-center items-center border-[1px]  border-zinc-600 hover:underline hover:text-blue-500 transition-all duration-300 w-[25%]'><Link to={`/view-book-details/${items?.book?._id}`}>{items?.book?.title}</Link></div>
                                <div className='p-2  flex justify-center items-center border-[1px]  border-zinc-600 w-[33%]'>{items?.book?.desc?.slice(0, 40)}...</div>
                                <div className='p-2  flex justify-center items-center border-[1px]  border-zinc-600  w-[10%]'>&#8377; {items?.book?.price}</div>
                                <div className='p-2  flex flex-col justify-center items-center border-[1px]  border-zinc-600  w-[20%]' >
                                    <button className='text-green-500 outline-none' onClick={() => { setoptions(i); setValues({ status: items?.status }) }}>{items.status === "Ordered Placed" ? (<p className=' text-yellow-500'>{items.status}</p>) : items.status === "Cancelled" ? (<p className='text-red-500'>{items.status}</p>) : items.status === "Delivered" ? (<p className=' text-blue-600'>{items.status}</p>) : (<p className=' text-green-500'>{items.status}</p>)}

                                    </button>
                                    <div className={`${options === i ? "flex" : "hidden"} mt-2`} >
                                        <select name="status" className='bg-zinc-800 outline-none' onChange={change} value={Values.status}>
                                            {[
                                                "Ordered Placed",
                                                "Out for Delivery",
                                                "Delivered",
                                                "Cancelled"
                                            ].map((items, i) => (
                                                <option value={items} key={i}>{items}</option>
                                            ))}
                                        </select>
                                        <button className=' text-green-500 hover:text-blue-600  mx-3' onClick={() => updateStatus(i)}><FaCheck /></button>
                                    </div>
                                </div>
                                <div className='p-2   border-[1px]  border-zinc-600 hover:text-blue-400 transition-all duration-300  text-md flex justify-center  items-center md:text-xl w-[7%] ' ><button onClick={() => {
                                    setuserDiv('fixed');
                                    setuserDivData(items.user)
                                }}><FaExternalLinkAlt /></button> </div>
                                <SeeUserDetails
                                    userDiv={userDiv}
                                    setuserDiv={setuserDiv}
                                    userDivData={userDivData}
                                />
                            </div >
                        ))}
                    </div>
                </div>
            </div>

            }

        </div >
    )
}

export default AllOrders
