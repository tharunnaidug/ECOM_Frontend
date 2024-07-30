import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Address = () => {
  const { addAddress,userAddress } = useContext(AppContext); 
  const [formData, setFormData] = useState({
    fullname: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    phno: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = 'Full Name is required';
    if (!formData.addressLine1) newErrors.addressLine1 = 'AddressLine1 is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.phno) newErrors.phno = 'Phone Number is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await addAddress(formData); // Replace with your context method
      // console.log(data);

      if (data?.error) {
        const newErrors = {};
        if (data?.error?.includes('Phone Number')) newErrors.phno = 'Phone Number already exists';
        setErrors(newErrors);
      } else {
        navigate('/checkout');
        // console.log("Address added");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded">
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label cursor-pointer">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
            id="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
          />
          {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="addressLine1" className="form-label cursor-pointer">Address Line 1</label>
          <input
            type="text"
            className={`form-control ${errors.addressLine1 ? 'is-invalid' : ''}`}
            id="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
          />
          {errors.addressLine1 && <div className="invalid-feedback">{errors.addressLine1}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="addressLine2" className="form-label cursor-pointer">Address Line 2</label>
          <input
            type="text"
            className={`form-control`}
            id="addressLine2"
            placeholder='optional'
            value={formData.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label cursor-pointer">City</label>
          <input
            type="text"
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            id="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label cursor-pointer">State</label>
          <input
            type="text"
            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
            id="state"
            value={formData.state}
            onChange={handleInputChange}
          />
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label cursor-pointer">Pincode</label>
          <input
            type="text"
            className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
            id="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
          />
          {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label cursor-pointer">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            value="India"
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phno" className="form-label cursor-pointer">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phno ? 'is-invalid' : ''}`}
            id="phno"
            value={formData.phno}
            onChange={handleInputChange}
          />
          {errors.phno && <div className="invalid-feedback">{errors.phno}</div>}
        </div>
        <button type="submit" className="btn btn-primary m-1">Submit</button>
      </form>
      {userAddress && (
        <button className='btn btn-warning m-1' onClick={()=>navigate(`/checkout`)}>Use Old Address</button>
      )}
    </div>
  );
};

export default Address;
