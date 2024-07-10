import React, { useEffect, useState } from 'react';
import axois from "axios";
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { Hourglass } from "react-loader-spinner"
import { FaCheck } from "react-icons/fa6";
import SeeUserDetails from './SeeUserDetails';


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
                const response = await axois.get("http://localhost:4000/api/v1/get-all-orders", { headers });
                setAllOrders(response.data.data);
                setloader(false);
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        fetch();
    }, [AllOrders])

    const updateStatus = async (i) => {
        try {
            const id = AllOrders[i]._id;
            setoptions(-1);
            const response = await axois.put(`http://localhost:4000/api/v1//update-order/${id}`, Values, { headers });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
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

            {AllOrders && AllOrders.length > 0 && <div className=' md:p-4 p-1 space-y-8'>
                <h1 className=' text-4xl text-zinc-500 font-semibold'>All Order History</h1>
                <table className=' w-full bg-zinc-800'>
                    <thead className=''>
                        <tr className=' text-xl text-zinc-200 text-center border-2 border-zinc-700 '>
                            <th className=' p-2 border-2 border-zinc-600 w-1/12'>Sr.</th>
                            <th className=' p-2 border-2 border-zinc-600 w-3/12'>Books</th>
                            <th className=' p-2 border-2 border-zinc-600 w-2/6'>Description</th>
                            <th className=' p-2 border-2 border-zinc-600 w-1/12'>Price</th>
                            <th className=' p-2 border-2 border-zinc-600 w-1/6 '>Status</th>
                            <th className=' p-2 border-2 border-zinc-600 w-[4%] text-2xl'><FaUserLarge /></th>
                        </tr>
                    </thead>
                    <tbody className=' text-sm '>
                        {AllOrders && AllOrders.map((items, i) => (
                            <>
                                <tr key={i} className=" text-sm h-8 font-semibold text-zinc-300 text-center border-2 border-zinc-600">
                                    <td className='p-2 border-2 border-zinc-600'>{i + 1}</td>
                                    <td className='p-2 border-2 border-zinc-600 hover:underline hover:text-blue-500 transition-all duration-300'><Link to={`/view-book-details/${items?.book?._id}`}>{items?.book?.title}</Link></td>
                                    <td className='p-2 border-2 border-zinc-600'>{items?.book?.desc?.slice(0, 40)}...</td>
                                    <td className='p-2 border-2 border-zinc-600'>&#8377; {items?.book?.price}</td>
                                    <td className='p-2 border-2 border-zinc-600 ' >
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
                                    </td>
                                    <td className='p-2 border-2 border-zinc-600 hover:text-blue-400 transition-all duration-300  text-xl' ><button onClick={() => {
                                        setuserDiv('fixed');
                                        setuserDivData(items.user)
                                    }}><FaExternalLinkAlt /></button> </td>
                                    <SeeUserDetails
                                        userDiv={userDiv}
                                        setuserDiv={setuserDiv}
                                        userDivData={userDivData}
                                    />
                                </tr >
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            }

        </div >
    )
}

export default AllOrders
