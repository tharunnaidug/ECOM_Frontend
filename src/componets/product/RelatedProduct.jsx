import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'


const RelatedProduct = ({category}) => {
    const{products}=useContext(AppContext)
    const [relatedProduct, setrelatedProduct] = useState([])
    useEffect(() => {
        setrelatedProduct(products?.filter((data)=>data?.category?.toLowerCase()==category?.toLowerCase()))
    }, [category,products])
    
  return (
    <>
    <div className="container text-center">
        <h1>Related Products</h1>
        <div className="container">
        <div className="row">
          {relatedProduct?.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 cursor-pointer text-capitalize">
                <Link to={`/product/${product._id}`} className='text-decoration-none'>
                  <img src={product.imgSrc} className="card-img-top " alt={product.title}  />
                  <div className="card-body d-flex flex-column" style={{color:"black"}}>
                    <h5 className="card-title ">{product.title}</h5>
                    <p className="card-text text-truncate">{product.description}</p>
                    <span href="#" className="btn btn-primary mt-auto">₹ {product.price}</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default RelatedProduct