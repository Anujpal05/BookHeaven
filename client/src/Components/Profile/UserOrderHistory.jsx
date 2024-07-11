import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hourglass } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import emptyOrder from "../../assets/empty-order.png";
import toast from 'react-hot-toast';

function UserOrderHistory() {

    const [order, setorder] = useState();
    const [loader, setloader] = useState(true);

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem('id')
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/get-user-orders", { headers })
                setorder(response.data.data);
                setloader(false);
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        fetch();
    }, [order])

    return (
        <>

            {loader && <div className='  w-full flex justify-center items-center p-10 h-[80vh]'>
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
                order && order.length == 0 && <div className='flex flex-col justify-center items-center h-auto md:h-[90vh] space-y-3'>
                    <h1 className=' text-4xl md:text-5xl font-semibold text-zinc-400'>No Any Order</h1>
                    <img src={emptyOrder} alt='Empty Order' className=' h-48' />
                </div>
            }

            {order && order.length > 0 && <div className=' md:p-4 p-1 space-y-8'>
                <h1 className=' text-4xl text-zinc-500 font-semibold'>Your Order History</h1>
                <div className=' w-full bg-zinc-800'>
                    <div className=' text-zinc-200 text-center border-[1px] border-zinc-700 flex text-sm md:text-xl  '>
                        <div className=' p-2 border-[1px] flex justify-center items-center  border-zinc-600 w-[5%]'>Sr.</div>
                        <div className=' p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[25%]'>Books</div>
                        <div className=' p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[30%]'>Description</div>
                        <div className=' p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[10%]'>Price</div>
                        <div className=' p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[18%] '>Status</div>
                        <div className=' p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[13%]'>Mode</div>
                    </div>
                    <div className=' text-sm w-full '>
                        {order && order.map((items, i) => (
                            <div key={i} className="  font-semibold text-zinc-300 text-center border-[1px] text-[12px] md:text-sm  h-fit border-zinc-600 w-full flex">
                                <div className='p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[5%]'>{i + 1}</div>
                                <div className='p-2 border-[1px] flex justify-center items-center border-zinc-600 hover:underline hover:text-blue-500 transition-all duration-300 w-[25%]'><Link to={`/view-book-details/${items.book._id}`}>{items.book.title}</Link></div>
                                <div className='p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[30%]'>{items.book.desc.slice(0, 40)}...</div>
                                <div className='p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[10%]'>&#8377; {items.book.price}</div>
                                <div className='p-2 border-[1px] flex justify-center items-center border-zinc-600 text-green-500 w-[18%]' >{items.status === "Ordered Placed" ? (<p className=' text-yellow-500'>{items.status}</p>) : items.status === "Cancelled" ? (<p className='text-red-500'>{items.status}</p>) : items.status === "Delivered" ? (<p className=' text-blue-600'>{items.status}</p>) : (<p className=' text-green-500'>{items.status}</p>)}
                                </div>
                                <div className='p-2 border-[1px] flex justify-center items-center border-zinc-600 w-[13%]'>COD</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            }
        </>
    )
}

export default UserOrderHistory
