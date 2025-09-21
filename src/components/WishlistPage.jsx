import React, { useContext } from 'react';
import {useNavigate} from 'react-router';
import { CategoryContext } from '../context/Context';
import { MdDelete } from "react-icons/md";
import { handleSuccess } from '../utils/notification';

const WishlistPage = () => {
    const {wishlist,setWishlist} = useContext(CategoryContext);
    const navigate = useNavigate()

    const deleteItem = (id) => {
        let removed = false;
        const updatedList = wishlist.filter((item) => {
            removed = true;
            return item.id !== id;
        });
        setWishlist(updatedList);
        if(removed) handleSuccess('Removed');
    }

  return (
    <div className='max-w-[1000px] bg-white mx-auto my-3'>
        <h1 className='text-lg sm:text-xl font-semibold p-5 mb-2 border-b border-gray-400'>My Wishlist ({wishlist.length})</h1>
            { wishlist.map((Item) => {

                let Realprice = Math.floor(Item.price * 85);
                let discount = Realprice * (Item.discountPercentage / 100);
                let discountedPrice = Math.floor(Realprice - discount); 
                let urlSafe = Item.title.toLowerCase().replace(/\s+/g, '-');

                return <div key={Item.id} className='flex justify-between gap-2 p-3 border-b border-gray-400 mb-3'>
                    <div className='flex gap-3' onClick={() => {navigate(`/product/${urlSafe}`, {state: {item : Item}})}}>
                        <img src={Item.thumbnail} className='w-[110px] h-[110px]  sm:w-[150px] sm:h-[150px] 
                        border-gray-400 rounded-sm' />
                        <div className='max-w-[700px] col-span-3'> 
                            <h1 className='text-md font-semibold'>{Item.title}</h1>
                            <p className='hidden sm:block text-[15px] text-gray-500'>{Item.description}</p>

                            <p className='flex flex-wrap items-center text-[13px] sm:text-[16px] mt-2'>
                                <span className='bg-green-600 p-1 text-white font-semibold 
                                rounded mt-2'> {(Item.rating).toFixed(1)} ⭐</span>
                                <span className='font-semibold text-green-500 ml-2 mt-2'>({Item.availabilityStatus})</span> 
                            </p>
                            <p className='flex flex-wrap items-center gap-3 mt-3'>
                                <span className='sm:text-xl font-semibold'>₹{discountedPrice}</span>
                                <span className='font-semibold text-gray-400 line-through'>₹{Realprice}</span>
                                <span className=' text-[14px] sm:text-[16px] font-semibold text-green-500'>
                                    {(Item.discountPercentage).toFixed(1)}% Off</span>
                            </p>
                        </div>
                    </div>
                    <MdDelete onClick={() => deleteItem(Item.id)} 
                    className='w-6 h-6 text-gray-500 sm:mr-2 cursor-pointer hover:text-red-600' />
                </div>
            })}

            { wishlist.length === 0 && 
                ( <div className='flex bg-white w-full sm:mt-2 h-[150px] items-center 
                justify-center rounded-lg flex-col p-4 gap-5'>
                    <h1 className='text-xl sm:text-2xl font-semibold'>Wishlist is Empty!</h1>
                </div> )
            } 
    </div>
  )
}

export default WishlistPage