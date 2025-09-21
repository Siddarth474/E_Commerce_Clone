import './App.css'
import {Route , Routes } from 'react-router';
import Navbar from './components/Navbar'
import SearchBox from './components/SearchBox'
import DisplayHome from './components/DisplayHome'
import SelectedCategory from './components/SelectedCategory';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import WishlistPage from './components/WishlistPage';
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
    <div className='w-full h-screen bg-gray-300 overflow-auto'>
      <Navbar />
      <SearchBox />
      <div>
        <Routes>
          <Route path='/' element={<DisplayHome />} />
          <Route path='/category/:id' element={<SelectedCategory />} /> 
          <Route path='/product/:name' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<WishlistPage />} />
        </Routes>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}
export default App
