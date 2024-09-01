import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'

const ShowProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { products, filteredData, addToCart, isAuth } = useContext(AppContext)
  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setLoading(false);
    }
  }, [filteredData]);
  if (loading) {
    return (
      <div className="container mt-3 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
          <span className='p-2'>Loading</span>
      </div>
    );
  }
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          {filteredData?.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 cursor-pointer text-capitalize">
                <Link to={`/product/${product._id}`} className='text-decoration-none'>
                  <img src={product.imgSrc} className="card-img-top fw-bolder" alt={product.title} />
                </Link>
                <div className="card-body d-flex flex-column" style={{ color: "black" }}>
                  <Link to={`/product/${product._id}`} className='text-decoration-none'>
                    <h5 className="card-title  " style={{ color: "black" }}>{product.title}</h5>
                    <p className="card-text text-truncate" style={{ color: "black" }}>{product.description}</p>
                  </Link>
                  <div className='d-flex'>
                    <span className="btn btn-primary mt-auto" onClick={() => {
                      if (isAuth) { addToCart(product?._id, product?.title, product?.price, 1, product?.imgSrc); }
                      else { navigate('/login'); }
                    }}>₹ {product.price}
                    </span>
                    <span className="btn mt-auto" style={{ marginLeft: "10px" }} onClick={() => {
                      if (isAuth) { addToCart(product?._id, product?.title, product?.price, 1, product?.imgSrc); }
                      else { navigate('/login'); }
                    }}><i className="fa-sharp fa-solid fa-cart-plus"></i>
                    </span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div >

    </>
  )
}

export default ShowProduct