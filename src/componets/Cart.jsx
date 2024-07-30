import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCart, clearCart, updateQty } = useContext(AppContext);
  const [price, setprice] = useState(0)
  const [qty, setqty] = useState(0)
  const navigate=useNavigate()

  useEffect(() => {
    if (cart?.items?.length > 0) {
      let q = 0;
      let p = 0;
      for (let i = 0; i < cart?.items?.length; i++) {
        q += cart?.items[i].qty
        p += cart?.items[i].price * cart?.items[i].qty
      }
      setprice(p)
      setqty(q)
    }
  }, [cart])


  if (!cart) {
    return <p>Loading cart...</p>;
  }

  if (cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {cart.items.map((product) => (
          <div key={product._id} className='col-12 col-sm-6 col-md-4 col-lg-3 my-2'>
            <div className='card h-100' style={{ backgroundColor: "#65ea2a38" }}>
              <div className="imgCon py-2 text-center">
                <img src={product.imgSrc} alt="Product" style={{ maxHeight: "150px", maxWidth: "150px" }} className='rounded' />
              </div>
              <div className="infoCon p-1">
                <h5>Product: {product.title}</h5>
                <h6>Quantity: {product.qty}</h6>
                <p>Total:₹ {product.price * product.qty}</p>
              </div>
              <div className="btnCon p-1 d-flex justify-content-around">
                <button className="btn btn-primary" onClick={() => updateQty(product.productId, 1)}><i className="fa-sharp fa-solid fa-plus"></i></button>
                <button className="btn btn-secondary" onClick={() => updateCart(product.productId, 1)}><i className="fa-sharp fa-solid fa-minus"></i></button>
                <button className="btn btn-warning" onClick={() => updateCart(product.productId, 10000)}><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="info conatiner">
        <div className='container'>
          <span className='m-1'>Total :₹  {price}</span>
          <span className='m-1'>No of Items :{qty}</span>
        </div>
        <div className="container">
          <button className="btn btn-success m-1"onClick={()=>navigate(`/shipping`)}>CheckOut</button>
          <button className="btn btn-danger m-1" onClick={() => { if (confirm("Do You Want Remove all Products !!!")) clearCart() }}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
