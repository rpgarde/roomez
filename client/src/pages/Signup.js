import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UploadForm from '../components/UploadForm'
import HouseForm from '../components/HouseForm'

import { useMutation } from '@apollo/client';
import { ADD_USER_AND_HOUSE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    photo: '',
    address: '',
    code: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [addUserAndHouse, { error, data }] = useMutation(ADD_USER_AND_HOUSE);

  const handleHouseForm = (code)=>{
    setFormState({
      ...formState,
      address: code.address ? code.address : formState.address,
      code: code.code ? code.code : formState.code,
    })  
  }

  const handleUserPhoto = (photo)=>{
    setFormState({
      ...formState,
      photo: photo.photo ? photo.photo : formState.photo
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('LOG FORM STATE')
    console.log(formState)

    try {
      const { data } = await addUserAndHouse({
        variables: { ...formState },
      });

      Auth.login(data.addUserAndHouse.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className="card">
        <h4 className="custom-bg-darkblue text-white p-2 text-center">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="form" onSubmit={handleFormSubmit}>
                <div className = "mb-3">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input
                    className="form-control"
                    placeholder="Your first name"
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formState.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className = "mb-3">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  className="form-control"
                  placeholder="Your last name"
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                </div>
                <div className = "mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  className="form-control"
                  placeholder="Your email"
                  name="email"
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div className = "mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  className="form-control"
                  placeholder="******"
                  name="password"
                  id="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <div className = "mb-3">
                <label className="form-label" htmlFor="mobile">Mobile</label>
                <input
                  className="form-control"
                  placeholder="Your mobile number"
                  name="mobile"
                  id="mobile"
                  type="text"
                  value={formState.mobile}
                  onChange={handleChange}
                />
                </div>
                <div className = "mb-3">
                  <UploadForm 
                   handleUserPhoto={handleUserPhoto}
                  />
                </div>
                <HouseForm
                  handleHouseForm={handleHouseForm}
                />
                <button
                  className="btn btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
