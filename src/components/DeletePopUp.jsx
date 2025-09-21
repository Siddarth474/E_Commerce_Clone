import React, { useContext } from 'react'
import { CategoryContext } from '../context/Context'
import { handleSuccess } from '../utils/notification';

const DeletePopUp = () => {
    const {isDelete,cartProducts,setCartProducts, setShowModel} = useContext(CategoryContext);

    const deleteProduct = (id) => {
        const updatedCart = cartProducts.filter(p => {
            return p.id !== id;
        });
        setCartProducts(updatedCart);
        handleSuccess('Item removed');
        setShowModel(false);
    }

  return (
    <div>
        <div className='fixed top-0 left-0 w-full h-full bg-black opacity-55 z-55'></div>
        <div className='fixed max-w-[250px] sm:max-w-[400px] w-full bg-gray-200 p-5 rounded 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 mx-auto'>
            <h1 className='text-lg sm:text-xl mb-3 font-semibold'>Remove Item</h1>
            <p className='text-[16px] font-semibold text-gray-500'>Are you sure you want to remove this item?</p>
            <div className='grid grid-cols-2 gap-2 text-sm sm:text-lg mt-5'>
                <button onClick={() => deleteProduct(isDelete) }
                className='bg-blue-600 text-white p-2 font-semibold rounded-sm cursor-pointer'>REMOVE</button>
                <button onClick={() => setShowModel(false)}
                className='border p-2 font-semibold rounded-sm cursor-pointer'>CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePopUp