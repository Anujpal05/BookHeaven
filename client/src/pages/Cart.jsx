import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { Hourglass } from "react-loader-spinner";
import cartImg from '../assets/emptyCart.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Cart() {
    const [cartBooks, setcartBooks] = useState();
    const [loader, setloader] = useState(true);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id"),
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/get-user-cart`, { headers });
                setcartBooks(response.data.cart)
                setloader(false)
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetch();
    }, [cartBooks])

    useEffect(() => {
        if (cartBooks && cartBooks.length > 0) {
            let total = 0;
            cartBooks.map((items) => (
                total += items.price
            ))
            setTotal(total);
            total = 0;
        }
    }, [cartBooks])

    const placeOrder = async () => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/order-placed`, { order: cartBooks }, { headers });
            toast.success(response.data.message);
            navigate("/profile/orderHistory");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const removeCartBook = async (bookid) => {
        try {
            if (confirm("Are You sure to remove book from cart?")) {
                const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/remove-from-cart/${bookid}`, {}, { headers });
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className=' bg-zinc-900 min-h-screen h-auto text-white'>
            {loader && <div className=' w-full h-screen flex justify-center items-center '>
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
            {cartBooks && cartBooks.length == 0 && <>
                <div className='h-screen flex flex-col justify-center items-center'>
                    <p className=' text-5xl text-zinc-500 font-semibold p-3'>Empty Cart</p>
                    <img src={cartImg} alt='cart Image' className=' h-48' />
                </div>
            </>}
            {cartBooks && cartBooks.length > 0 && <div className=' pt-24 p-5'>
                <h1 className=' text-4xl text-zinc-500 font-semibold'>Your Cart</h1>
                {cartBooks.map((items, i) => (
                    <div key={i} className='  w-full bg-zinc-800 mt-5 flex items-center px-5 py-2'>
                        <Link to={`/view-book-details/${items._id}`} className=' w-full'>
                            <div className='flex justify-between items-center w-full '>
                                <img src={items.url} alt='book' className=' h-20' />
                                <div className=' space-y-1'>
                                    <p className=' text-xl text-zinc-200 font-semibold'>{items.title}</p>
                                    <p className=' text-md text-zinc-400 font-semibold'>{items.desc.slice(0, 100)}...</p>
                                </div>
                                <div className=' text-2xl text-zinc-100 font-semibold'>&#8377;{items.price}</div>
                            </div>
                        </Link>
                        <button className='w-10 mx-8 bg-red-100 hover:bg-red-200 text-red-600 h-10 text-2xl flex justify-center items-center rounded' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
                    </div>
                ))}
                <div className=' w-full flex justify-end'>
                    <div className=' bg-zinc-800 h-36 m-5 w-52 p-2 rounded-md space-y-3'>
                        <h1 className=' text-3xl font-semibold text-zinc-200 text-center'>Total Amount</h1>
                        <div className=' flex justify-between w-full text-zinc-400 font-semibold px-3'>
                            <p className=''>{cartBooks.length} books</p>
                            <p>&#8377; {total}</p>
                        </div>
                        <button className=' bg-blue-400 p-2 text-zinc-950 font-semibold text-md w-full rounded-md hover:bg-blue-500 outline-none transition-all duration-300' onClick={placeOrder}>Place your order</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Cart
