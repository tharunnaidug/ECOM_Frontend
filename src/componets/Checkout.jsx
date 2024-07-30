import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const { cart, userAddress, finalCheckOut, setUserOrder } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    console.log(cart, userAddress);
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        totalQty += cart.items[i].qty;
        totalPrice += cart.items[i].price * cart.items[i].qty;
      }
    }
    setPrice(totalPrice);
    setQty(totalQty);
  }, [cart]);

  const handleProceedToPay = async () => {
    setIsLoading(true);
    const formData = {
      total: price,
      address: userAddress._id,
      payment: 'UPI',
      items: cart?.items,
    };

    try {
      const response = await finalCheckOut(formData);
      if (response.message) {
        setUserOrder(response?.order);
        navigate('/finalcheckout');
      }
    } catch (error) {
      console.error('Error processing checkout:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  if (!cart) {
    return <p>Loading......</p>;
  }

  return (
    <div className="container my-3">
      <h1 className="text-center">Order Summary</h1>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <div className="card bg-dark text-light">
            <div className="card-header text-center">
              Product Details
            </div>
            <div className="card-body">
              {cart?.items?.map((product) => (
                <div key={product._id} className="d-flex justify-content-between align-items-center mb-3" style={{ textTransform: 'capitalize' }}>
                  <img src={product.imgSrc} style={{ width: "50px", height: "50px", marginRight: "5px" }} alt="Product" />
                  <div>{product.title}</div>
                  <div>Qty: {product.qty}</div>
                  <div>Price: {product.price}</div>
                  <div>Total: {product.price * product.qty}</div>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-primary" style={{ fontWeight: "bold" }}>Total: ₹{price}</button>
                <button className="btn btn-info" style={{ fontWeight: "bold" }}>Quantity: {qty}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <div className="card bg-dark text-light">
            <div className="card-header text-center">
              Shipping Address
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li><strong>Name:</strong> {userAddress?.fullname}</li>
                <li><strong>Phone:</strong> {userAddress?.phno}</li>
                <li><strong>Address:</strong> {userAddress?.addressLine1}</li>
                <li><strong>City:</strong> {userAddress?.city}</li>
                <li><strong>PinCode:</strong> {userAddress?.pincode}</li>
                <li><strong>State:</strong> {userAddress?.state}</li>
                <li><strong>Country:</strong> {userAddress?.country}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={handleProceedToPay} disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Proceed to Pay'
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
