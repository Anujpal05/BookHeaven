import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hourglass } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import emptyOrder from "../../assets/empty-order.png";

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
                alert(error.response.data.message)
            }
        }

        fetch();
    }, [order])

    return (
        <>

            {loader && <div className='  w-full flex justify-center items-center p-10 h-96 '>
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
                <table className=' w-full bg-zinc-800'>
                    <thead className=''>
                        <tr className=' text-xl text-zinc-200 text-center border-2 border-zinc-700 '>
                            <th className=' p-2 border-2 border-zinc-600 w-1/12'>Sr.</th>
                            <th className=' p-2 border-2 border-zinc-600 w-3/12'>Books</th>
                            <th className=' p-2 border-2 border-zinc-600 w-2/6'>Description</th>
                            <th className=' p-2 border-2 border-zinc-600 w-1/6'>Price</th>
                            <th className=' p-2 border-2 border-zinc-600 w-1/6 '>Status</th>
                            <th className=' p-2 border-2 border-zinc-600 w-1/6'>Mode</th>
                        </tr>
                    </thead>
                    <tbody className=' text-sm '>
                        {order && order.map((items, i) => (
                            <tr key={i} className=" text-sm h-8 font-semibold text-zinc-300 text-center border-2 border-zinc-600">
                                <td className='p-2 border-2 border-zinc-600'>{i + 1}</td>
                                <td className='p-2 border-2 border-zinc-600 hover:underline hover:text-blue-500 transition-all duration-300'><Link to={`/view-book-details/${items.book._id}`}>{items.book.title}</Link></td>
                                <td className='p-2 border-2 border-zinc-600'>{items.book.desc.slice(0, 40)}...</td>
                                <td className='p-2 border-2 border-zinc-600'>&#8377; {items.book.price}</td>
                                <td className='p-2 border-2 border-zinc-600 text-green-500' >{items.status}</td>
                                <td className='p-2 border-2 border-zinc-600'>COD</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            }
        </>
    )
}

export default UserOrderHistory
