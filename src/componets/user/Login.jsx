import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';



const Login = () => {
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
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

      const data = await login(formData)
      console.log(data);
      localStorage.setItem('ECOM',data?.username)

      if (data.error) {
        const newErrors = {};
        if (data?.error?.includes('No user found')) newErrors.username = 'No user found ';
        if (data?.error?.includes('Incorrect Password')) newErrors.password = 'Invalid password';
        setErrors(newErrors);
      } else {
        navigate('/');
        console.log("Logged in");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="container mt-3 bg-success p-4 rounded">
        <h2>Login</h2>
        <form className='mb-10' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label cursor-pointer">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label cursor-pointer">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <Link to={`/register`} className='text-decoration-none md:fs-5 text-reset fw-medium my-5'>Don't Have an Account? Register Now!</Link>
      </div>
    </>
  );
};

export default Login;
