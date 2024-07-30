import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

const Profile = () => {
  const { user } = useContext(AppContext);
  console.log(user);

  return (
    <div className='container mt-3 p-2 d-flex justify-content-center rounded' style={{backgroundColor:"#65ea2a38"}}>
      {user ? (
        <div>
          <h2 className='text-center'>Welcome {user.name}</h2>
          <h4>Your Info</h4>
          <div className="container d-flex flex-column flex-md-row rounded" style={{backgroundColor:"#65ea2a48"}}>
            <p className='m-1 p-2'><strong>Username:</strong> {user.username}</p>
            <p className='m-1 p-2'><strong>Name:</strong> {user.name}</p>
            <p className='m-1 p-2'><strong>Phone Number:</strong> {user.phno}</p>
            <p className='m-1 p-2'><strong>Email:</strong> {user.email}</p>
          </div>
            <p><strong>Your Address</strong></p>
          <div className="container d-flex flex-column flex-md-row">
            {user.address && (
              <div className='d-flex flex-column flex-md-row'>
                <p className='m-1 p-2'><strong>FullName:</strong> {user.address.fullname}</p>
                <p className='m-1 p-2'><strong>Line 1:</strong> {user.address.addressLine1}</p>
                <p className='m-1 p-2'><strong>Line 2:</strong> {user.address.addressLine2}</p>
                <p className='m-1 p-2'><strong>City:</strong> {user.address.city}</p>
                <p className='m-1 p-2'><strong>State:</strong> {user.address.state}</p>
                <p className='m-1 p-2'><strong>Country:</strong> {user.address.country}</p>
                <p className='m-1 p-2'><strong>Pincode:</strong> {user.address.pincode}</p>
              </div>
            )}
          </div>
            <p><strong>Your Orders:</strong></p>
          <div className="container d-flex flex-column flex-md-row rounded" style={{backgroundColor:"#65ea2a48"}}>
            {user.orders && user.orders.length > 0 ? (
              <ul>
                {user.orders.map(order => (
                  <li key={order.id}>
                    <p className='m-1 p-2'><strong>Order ID:</strong> {order._id}</p>
                    <p className='m-1 p-2'><strong>Status</strong> {order.status}</p>
                    <p className='m-1 p-2'><strong>Payment:</strong> {order.payment}</p>
                    <p className='m-1 p-2'><strong>Total Amount:</strong> {order.total}</p>

                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders available</p>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
