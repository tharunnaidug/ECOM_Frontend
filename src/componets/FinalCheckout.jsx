import React, { useContext } from 'react'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const FinalCheckout = () => {
    const{userOrder}= useContext(AppContext)
    // console.log(userOrder)
    const navigate=useNavigate()
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center flex-column rounded" style={{backgroundColor:"green"}}>
        <h2 className='m-1'>Your Order Has Been Placed</h2>
        <div className="container m-1" style={{maxWidth:'500px'}}>
           <p> order id:{userOrder?._id}</p>
           <p> Payment :{userOrder?.payment}</p>
           <p> Status  :{userOrder?.status}</p>
        </div>
        <button className="btn btn-primary m-2"onClick={()=>navigate("/")}>Continue Shopping..</button>
    </div>
    </>
  )
}

export default FinalCheckout