import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';




const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const { products, setFilteredData, logout, isAuth } = useContext(AppContext);

  const filterByCat = (category) => {
    setFilteredData(products.filter((data) => data?.category?.toLowerCase() == category?.toLowerCase()))
  }
  const filterByPrice = (price) => {
    if (price > 50000) {
      setFilteredData(products.filter((data) => data?.price >= price))
      return
    }
    if (price <= 19999) return setFilteredData(products.filter((data) => data?.price <= price))
    if (price <= 29999) return setFilteredData(products.filter((data) => data?.price <= price && data?.price > 19999))
    if (price <= 39999) return setFilteredData(products.filter((data) => data?.price <= price && data?.price > 29999))
    if (price <= 49999) return setFilteredData(products.filter((data) => data?.price <= price && data?.price > 39999))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      searchInputRef.current.focus();
      return;
    }
    navigate(`/product/search/${search}`);
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary md-px-5">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">MERN ECOM</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-1">

              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user"></i>
                </button>
                <ul className="dropdown-menu">
                  {isAuth &&(
                    <>
                    <li> <Link to={'/profile'} className="navbar-brand dropdown-item">Profile</Link></li>
                    <li><button className=" btn btn-outline-danger " type='button' style={{marginLeft:"15px"}} onClick={() => {logout(); navigate("/");}}>Logout</button></li>
                    </>
                  )}
                  {!isAuth && (
                    <>
                     <li> <Link to={'/login'} className="navbar-brand dropdown-item">Login</Link></li>
                     <li> <Link to={'/register'} className="navbar-brand dropdown-item">Register</Link></li>
                     <li> <Link to={'/admin'} className="navbar-brand dropdown-item">Admin</Link></li>
                    </>
                  )}
                </ul>
              </div>
            </li>
            <li className="nav-item m-1">
            {isAuth ? (
            <Link to={'/cart'} className="navbar-brand">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          ) : (
            <span className="navbar-brand disabled" style={{cursor:"not-allowed"}} title='Login First'>
              <i className="fa-solid fa-cart-shopping"></i>
            </span>
          )}
            </li>
            <div className="dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filters
              </a>

              <ul className="dropdown-menu">
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => setFilteredData(products)}>All Products</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByCat("phone")}>Mobiles</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByCat("laptop")}>Laptops</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByCat("Camera")}>Camera</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByPrice(19999)}>0-19999</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByPrice(29999)}>29999</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByPrice(39999)}>39999</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByPrice(49999)}>49999</div></li>
                <li><div className="dropdpwn-item cursor-pointer" onClick={() => filterByPrice(50001)}>50000+</div></li>
              </ul>
            </div>
          </ul>

          <form className="d-flex" role="search" onSubmit={submitHandler}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search All Products.."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchInputRef}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
