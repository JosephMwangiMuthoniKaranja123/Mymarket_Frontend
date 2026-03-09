import { Routes, Route } from 'react-router-dom';

import Home from './pages/home' 
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Products from './pages/product';
import Category from './pages/category';
import Orders from './pages/orders';
import Addproduct from './pages/addproduct';
import Productdetails from './pages/productdetails';
import Cart from './pages/cart';
import Orderdetails from './pages/orderdetails';


function App() {
 

  return (
    <>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/category/:categoryid' element={<Category/>} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/productdetails/:productid' element={<Productdetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders/:id' element={<Orderdetails/>}/>
 
      </Routes>

    </>
  )
} 

export default App
