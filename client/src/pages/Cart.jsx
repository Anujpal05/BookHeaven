import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";

function Cart() {
    const [cartBooks, setcartBooks] = useState();
    const [total, setTotal] = useState(0);
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id"),
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/get-user-cart", { headers });
                setcartBooks(response.data.cart)
            } catch (error) {
                alert(error)
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



    const removeCartBook = async (bookid) => {
        try {
            if (confirm("Are You sure to remove book from cart?")) {
                const response = await axios.put(`http://localhost:4000/api/v1/remove-from-cart/${bookid}`, {}, { headers });
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className=' bg-zinc-900 min-h-screen  text-white'>
            {cartBooks && cartBooks.length == 0 && <>
                <div>

                </div>
            </>}
            {cartBooks && cartBooks.length > 0 && <div className=' pt-24 p-5'>
                <h1 className=' text-4xl text-zinc-500 font-semibold'>Your Cart</h1>
                {cartBooks.map((items, i) => (
                    <div key={i} className='  w-full bg-zinc-800 mt-5 flex justify-between items-center px-5 py-2'>
                        <img src={items.url} alt='book' className=' h-20' />
                        <div className=' space-y-1'>
                            <p className=' text-xl text-zinc-200 font-semibold'>{items.title}</p>
                            <p className=' text-md text-zinc-400 font-semibold'>{items.desc.slice(0, 100)}...</p>
                        </div>
                        <div className=' text-2xl text-zinc-100 font-semibold'>&#8377;{items.price}</div>
                        <button className='w-10 bg-red-100 text-red-600 h-10 text-2xl flex justify-center items-center rounded' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
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
