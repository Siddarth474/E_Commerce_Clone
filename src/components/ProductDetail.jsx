import React, {useContext,useState} from 'react'
import {useLocation, useNavigate} from 'react-router'
import { CategoryContext } from '../context/Context';
import { FaHeart } from "react-icons/fa";
import {handleSuccess } from '../utils/notification';

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.item;
  const navigate = useNavigate();

  const {setCartProducts, wishlist, setWishlist} = useContext(CategoryContext);

  const Realprice = Math.floor(product.price * 85);
  const discount = Realprice * (product.discountPercentage)/100;
  const discountedPrice = Math.floor(Realprice - discount);

  const handleCart = () => {
    let added = false;
    
    setCartProducts(prev => {
      const exist = prev.find(p => p.id === product.id);
      if (exist) return prev;
      added = true;
      return [...prev, {...product, quantity: 1}];
    });
    if(added) handleSuccess('Added to the cart');
  }
  
  const handleWishlist = () => {
    let added = false;

    setWishlist(prev => {
      const listed = prev.find(p => p.id === product.id);
      if (listed) {
        added = false;
        return prev.filter(p => p.id !== product.id);
      }
      added = true;
      return [...prev , product]; 
    });

    if(added) handleSuccess('Added to the wishlist');
    else handleSuccess('Removed from the wishlist');
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className='max-w-[1350px] bg-white p-4 my-2 mx-auto grid grid-flow-row md:grid-flow-col gap-5'>
      <section>
        <div className='flex md:border border-gray-300 relative'>
          <img src={product.thumbnail} className='w-[300px] mx-auto md:w-[400px]' alt={product.title} />
          <FaHeart onClick={() => handleWishlist()}
          className={`${isWishlisted ? 'text-red-500' : 'text-gray-500'}
           absolute w-9 h-9 right-0 sm:top-3 sm:right-3 cursor-pointer border-2 p-2 rounded-full`}/>
        </div>
        <div className='hidden w-full md:flex gap-2 text-white mt-3'>
          <button onClick={() => handleCart()}  className='text-xl p-3 bg-amber-400 w-[50%] rounded 
          font-semibold cursor-pointer'>Add To Cart</button>
          <button onClick={() => {navigate(`/cart`); handleCart();}} 
          className='text-xl p-3 bg-orange-500 w-[50%] rounded font-semibold cursor-pointer'> Buy Now</button> 
        </div>
      </section>

      <section>
        <h1 className='text-3xl font-semibold '>{product.title}</h1>
        <p className='hidden sm:block text-gray-500 font-semibold'>({product.description})</p>
        <div className='mt-4'>
          <span className='bg-green-600 text-white font-semibold p-1 rounded'> {(product.rating).toFixed(1)} ⭐</span>
          <span className='font-semibold text-gray-500 ml-2'>500+ Ratings & 1,000+ Reviews</span>
        </div>

        <div>
          <h2 className='text-green-500 mt-5'>Special Price</h2>
          <div className='flex flex-wrap items-center mb-2 gap-3'>
            <h2 className='text-3xl font-semibold'>₹{discountedPrice}</h2>
            <p className='text-gray-500 line-through'>₹{Realprice}</p>
            <p className='text-lg font-semibold text-green-500'>{Math.floor(product.discountPercentage)}% Off</p>
            <p className='text-green-600 hidden md:block'>({product.availabilityStatus})</p>
          </div>
          <p className='font-semibold text-red-500'>Stocks: {product.stock}</p>
          <p>Shipping: {product.shippingInformation}</p>
          <p className='text-[15px]'>Free Delivery</p>
        </div>

        <div className='mt-4'>
          <h2 className='text-[22px] mb-2 font-semibold'>Warranty & Policy</h2>
          <p><span className='font-semibold'>Warranty:</span> {product.warrantyInformation}</p>
          <p>{product.returnPolicy} by <span className='text-blue-600 font-semibold'> Flipkart</span></p>
        </div>

        <div className='my-7 border border-gray-300 '>
          <h2 className='text-[22px] font-semibold m-3'>Ratings & Reviews</h2>
          {product.reviews.map((rev, i) => {
            return <div key={i} className='border-t border-gray-300 p-3'>
              <p className='flex items-center gap-4'>
                <span className='bg-green-600 p-1 text-white rounded'>{rev.rating} ⭐</span>
                <span className='font-semibold'>{rev.comment}</span>
              </p>
              <p className='flex flex-col lg:flex-row gap-3 font-semibold mt-2 text-gray-500'>
                <span className='whitespace-nowrap'>{rev.reviewerName}</span>
                <span className='whitespace-nowrap'>{rev.reviewerEmail}</span>
                <span className='whitespace-nowrap'>{(rev.date).split('T')[0]}</span>
              </p>
            </div>
          })}
        </div>

        <div className='w-full  flex md:hidden gap-2 bg-white px-3 py-2 text-white mt-3 bottom-0 left-0 fixed z-40'>
          <button onClick={handleCart}
          className='text-lg p-2 bg-amber-400 w-[50%] rounded
           font-semibold cursor-pointer'>Add To Cart</button>
          <button onClick={() => {navigate(`/cart`); handleCart();}}  
          className='text-lg p-2 bg-orange-500 w-[50%] rounded 
          font-semibold cursor-pointer'> Buy Now</button>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail