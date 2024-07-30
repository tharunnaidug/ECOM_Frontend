import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import { ToastContainer, toast,Bounce } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
  // const url = "http://localhost:3000";
   const url = "https://ecom-backend-gwwo.onrender.com";


  const [products, setProducts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await axios.get(`${url}/product`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        // console.log(response.data.product);
        setProducts(response.data.product);
        setFilteredData(response.data.product);

        const username = localStorage.getItem("ECOM");
        if (username) {
          setIsAuth(true);
          await userProfile(username);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    getProducts();
    getCart();
    getAddress()
  }, [reload]);

  const login = async (formData) => {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    setIsAuth(true);
    toast.success( "Welcome Back!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    return response.json();
  };

  const register = async (formData) => {
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    setIsAuth(true);
    toast.success( "Welcome !", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    return response.json();
  };

  const logout = async () => {
    setIsAuth(false);
    const response = await fetch(`${url}/logout`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    localStorage.removeItem("ECOM");
    return response.json();
  };

  const userProfile = async (username) => {
    try {
      let response = await axios.get(`${url}/protected/profile/${username}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  const addToCart = async (productId, title, price, qty, imgScr) => {
    // console.log("frontend ",imgScr)
    try {
      let response = await axios.post(`${url}/cart/add`,
        { productId, title, price, qty, imgScr }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log("myCart", response.data.message);
      setReload(!reload);
      toast.info( response.data.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

    } catch (error) {
      console.error('Error Add To Cart:', error);
    }
  };
  const getCart = async () => {
    try {
      let response = await axios.get(`${url}/cart/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setCart(response.data.cart);
      // console.log(response.data.cart);
    } catch (error) {
      console.error('Error fetching Cart:', error);
    }
  };
  const updateCart = async (productId,qty) => {
    try {
      let response = await axios.post(`${url}/cart/update`,{productId,qty}, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(response.data);
      setReload(!reload);
      toast.info( response.data.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    } catch (error) {
      console.error('Error Upadting Cart:', error);
    }
  };
  const clearCart = async () => {
    try {
      let response = await axios.get(`${url}/cart/clear`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      setReload(!reload);
      toast.info( response.data.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    } catch (error) {
      console.error('Error Clearing Cart:', error);
    }
  };

  const updateQty = async (productId,qty) => {
    try {
      let response = await axios.post(`${url}/cart/updateQty`,{productId,qty}, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(response.data);
      setReload(!reload);
      toast.info( response?.data?.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return response.json()
    } catch (error) {
      console.error('Error Updating Qty:', error);
    }
  };
  const addAddress = async (formData) => {
    try {
      const response = await fetch(`${url}/protected/address/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      // console.log(response.data);
      setReload(!reload)
      toast.info( response.data, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    } catch (error) {
      console.error('Error Updating Address:', error);
    }
  };
  const getAddress = async () => {
    const response=await axios.get(`${url}/protected/address`,{
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  // console.log(response.data.add[0])
  setUserAddress(response.data.add[0]);
  }

  const finalCheckOut = async (formData) => {
    try {
      const response = await fetch(`${url}/payment/ordercheckout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error Updating Address:', error);
    }
  };
  
  

  return (
    <AppContext.Provider value={{ products, login, register, setIsAuth, isAuth, filteredData, setFilteredData, logout, user, addToCart,cart,updateCart,clearCart,updateQty ,addAddress,userAddress,finalCheckOut,setUserOrder,userOrder}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
