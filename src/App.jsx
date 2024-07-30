import React from 'react'
import AppContext from './context/AppContext'
import ShowProduct from './componets/product/ShowProduct'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './componets/product/ProductDetails';
import Navbar from './componets/Navbar';
import SearchProduct from './componets/product/SearchProduct';
import Register from './componets/user/Register';
import Login from './componets/user/Login';
import Profile from './componets/user/Profile';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './componets/Cart';
import Address from './componets/Address'
import Checkout from './componets/Checkout'
import FinalCheckout from './componets/FinalCheckout';
import Admin from './componets/admin/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ShowProduct />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Address />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/finalcheckout' element={<FinalCheckout />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/product/search/:id' element={<SearchProduct />} />
      </Routes>
    </Router>
  );
};

export default App
