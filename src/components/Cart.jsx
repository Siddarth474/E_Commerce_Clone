import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../context/Context'
import {useNavigate} from 'react-router'
import DeletePopUp from './DeletePopUp';
import { handleSuccess } from '../utils/notification';

const Cart = () => {
    const navigate = useNavigate();
    const {cartProducts, setCartProducts, setIsDelete, showModel, setShowModel} = useContext(CategoryContext);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        const calculatedTotal = cartProducts.reduce((acc,item) => {
            const ActualPrice = Math.floor(item.price * 85);
            const discounted = Math.floor(ActualPrice - (ActualPrice * (item.discountPercentage / 100))); 
            return acc + (discounted * item.quantity);
        }, 0);

        setTotal(calculatedTotal);
    }, [cartProducts]);


    const increement = (id) => {
        const updated = cartProducts.map(item => {
            if(item.id === id) {
                if(item.quantity < 5) return {...item, quantity : item.quantity + 1};
            }
            return item;
        });
        setCartProducts(updated);
    }

    const decreement = (id) => {
        const updated = cartProducts.map(item => {
            if(item.id === id) {
                if(item.quantity > 1) return {...item, quantity : item.quantity - 1};
            }
            return item;
        });
        setCartProducts(updated);
    }

  return (
    <div className='max-w-[1300px] mx-auto my-3 flex flex-col lg:flex-row gap-5'>
        {cartProducts.length > 0 && (<section className='bg-white w-full lg:w-[70%] sm:rounded-lg overflow-auto'>
            { cartProducts.map((product) => {
                const Realprice = Math.floor(product.price * 85);
                const discount = Realprice * (product.discountPercentage / 100);
                const discountedPrice = Math.floor(Realprice - discount);
                const urlSafe = product.title.toLowerCase().replace(/\s+/g, '-'); 

                return <div key={product.id} className='border-b border-gray-300 p-4'>
                    <div onClick={() => {navigate(`/product/${urlSafe}`, {state: {item : product}})}}
                    className='flex flex-col justify-between md:flex-row mb-4'>
                        <div className='flex'>
                            <img src={product.thumbnail} className='w-[120px] h-[120px] sm:w-[200px] sm:h-[200px]' />
                            <div>
                                <h2 className='sm:text-lg font-semibold'>{product.title}</h2>
                                <p className='text-sm font-semibold text-gray-500'>
                                    Brand: {product.brand  ? product.brand : 'None'}
                                </p>
                                <p className='flex flex-wrap gap-3 items-center my-2'>
                                    <span className='text-gray-500 line-through'>₹{Realprice}</span>
                                    <span className='text-lg sm:text-xl font-semibold'>₹{discountedPrice}</span>
                                    <span className='text-green-500 font-semibold'>
                                        {(product.discountPercentage).toFixed(1)}% Off
                                    </span>
                                </p>
                            </div> 
                        </div>
                        <p className='flex flex-col mt-3 ml-2 md:mr-4'>
                            <span className='md:font-semibold'>
                                <span className='font-semibold'>Delivered: </span>
                                {product.shippingInformation}
                            </span>
                            <span>Free Delivery</span>
                        </p>
                    </div>

                    <div>
                        <div className='flex items-center gap-3 mt-5 ml-3'>
                            <button onClick={() => decreement(product.id)}
                            className='w-8 h-8 text-[17px] sm:text-[20px] flex items-center justify-center 
                            rounded-full font-semibold border border-gray-400 cursor-pointer'> - </button>

                            <p className='w-[40px] text-[17px] sm:text-[19px] text-center px-3 py-1 rounded 
                            border border-gray-400 bg-gray-200'> {product.quantity} </p> 

                            <button onClick={() => increement(product.id)}
                            className='w-8 h-8 text-[17px] sm:text-[20px] flex items-center justify-center 
                            rounded-full font-semibold border border-gray-400 cursor-pointer'> + </button>

                            <p onClick={() => {setIsDelete(product.id); setShowModel(true);}} className='uppercase font-semibold 
                            text-md sm:text-lg cursor-pointer ml-4'> Remove </p>
                        </div>
                    </div>
                </div>
            })} 
            <div className='hidden lg:flex items-center justify-between sm:justify-end 
            text-lg sm:text-xl font-semibold  p-6 '>
                <h1 className='block sm:hidden'>₹{total}</h1>
               <button onClick={() => {handleSuccess('Your order is placed!'), setCartProducts([]) }} 
               className='bg-orange-400 text-white rounded px-4 py-2'>Place Order</button>
            </div>
        </section>)}

        {showModel ? <DeletePopUp /> : <></> }

        { cartProducts.length === 0 && 
            (<div className='flex bg-white w-full sm:mt-2 h-[200px] items-center 
            justify-center rounded-lg flex-col p-4 gap-5'>
                <h1 className='text-xl font-semibold'>Your Cart is empty!</h1>
                <button onClick={() => navigate(`/`) } className='bg-blue-700 text-white py-2 px-6 
                rounded cursor-pointer'> Shop Now </button> 
            </div>)
        } 

        {cartProducts.length > 0 && (<section className='w-full lg:w-[30%] h-max mb-15 bg-white sm:rounded-lg'>
            <h1 className='font-semibold uppercase p-5 text-gray-500'>Price Details</h1>
            <div className=' flex flex-col gap-4 border-y border-gray-300 p-5'>
                <p className='flex justify-between'>
                    <span>Price ({cartProducts.length} items)</span>
                    <span className='font-semibold'>₹{total}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Delivery Charges</span>
                    <span className='font-semibold text-green-500'>Free</span>
                </p>
                <p className='flex justify-between'>
                    <span>Packaging Fee</span>
                    <span className='font-semibold'>₹9</span>
                </p>
            </div>
            <div className='flex justify-between items-center p-5'>
                <h2 className='font-semibold text-xl'>Total Amount</h2>
                <p className='font-semibold text-xl'>₹{total ? total + 9 : total}</p>
            </div>
            
            <div className='flex p-3 lg:hidden items-center justify-between bg-white w-full
            sm:justify-end text-lg sm:text-xl font-semibold border-t border-gray-300 bottom-0 left-0 fixed z-40'>
                <h1 className='block sm:hidden'>₹{total}</h1>
                <button onClick={() => {handleSuccess('Your order is placed!'), setCartProducts([]) }} 
                className='bg-orange-400 text-white rounded px-4 py-2'>Place Order</button>
            </div> 
        </section> )}
        
    </div>
  )
}

export default Cart