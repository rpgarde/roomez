import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_HOUSE } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  let currentHouseId
  if(Auth.loggedIn()){
    currentHouseId = Auth.getProfile().data.house._id
  }

  const { loading, data } = useQuery(QUERY_HOUSE, {
    variables:{
      _id: currentHouseId?currentHouseId:null
    }
  });

const house = data?.house[0] || {}
console.log(house)
const occupants = house.occupants
console.log(occupants)

  // redirect to personal profile page if username is yours
  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  let houseImgString = '/images/'+house.photo

  return (
    <div className = "container-fluid">
      <h1 className = "fw-bold text-center my-3">Welcome to your house</h1>
      <div className="row">
        <div className = "col-md-6">
          <div className = "card mb-3">
          {house.photo ? (<img src = {houseImgString} className = "card-img-top"/>) : null}
            <div className = "card-body">
              <h5 className="card-title fw-bold">{house.address}</h5>
              <p className = "card-text">Your code to share with your housemates: <span className = "fw-bold">{house.code}</span></p>
          </div>
          </div>
        </div>
        <div className = "col-md-6">
          <h3 className = "fw-bold mb-3">House Directory</h3>
          {occupants.map((user)=>(
            <div className = "card mb-3">
              <div className = "card-body">
              <h5 className = "fw-bold card-title">{user.firstName} {user.lastName}</h5>
              </div>
                <ul className = "list-group list-group-flush">
                  <li className = "list-group-item"><span className = "fw-bold">Mobile:</span> {user.mobile}</li>
                  <li className = "list-group-item"><span className = "fw-bold">Email:</span> {user.email}</li>
                </ul>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
