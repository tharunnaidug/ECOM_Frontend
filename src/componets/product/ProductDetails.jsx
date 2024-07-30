import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RelatedProduct from './RelatedProduct'
import AppContext from '../../context/AppContext'


const ProductDetails = () => {
    const { id } = useParams()

    // const url = "http://localhost:3000"
    const url = "https://ecom-backend-gwwo.onrender.com"

    const [products, setproducts] = useState()
    const {isAuth,addToCart}=useContext(AppContext)

    useEffect(() => {
        const getProduct = async () => {
            let data = await axios.get(`${url}/product/${id}`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            console.log(data.data.product)
            setproducts(data.data.product)
        }

        getProduct()
    }, [id])


    return (
        <>
            <div className="container text-center text-capitalize d-flex flex-column flex-md-row justify-content-md-evenly ">
                <div className="left">
                    <img src={products?.imgSrc} alt="Image" style={{ width: "300px", height: "250px" }} className='rounded m-2' />
                </div>
                <div className="right px-3 d-flex flex-column align-items-start justify-content-evenly">
                    <h2 className='fw-bold'>{products?.title}</h2>
                    <p className='overflow-y-auto mh-40 text-start' style={{maxHeight:"35vh"}}>{products?.description}</p>
                    <h5 className='fw-bold'>₹ {products?.price}</h5>
                    <div>
                        <button className="btn btn-success px-3 fw-medium">Buy Now</button>
                        <span className="btn btn-warning mt-auto " style={{ marginLeft: "10px" }} onClick={() => {
                      if (isAuth) { addToCart(products?._id, products?.title, products?.price, 1, products?.imgSrc); }
                      else { navigate('/login'); }
                    }}>Add To Cart <i className="fa-sharp fa-solid fa-cart-plus"></i>
                    </span>
                    </div>
                </div>
            </div>
            <RelatedProduct category={products?.category} />

        </>
    )
}

export default ProductDetails;