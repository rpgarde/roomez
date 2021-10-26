import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HouseForm = (props) => {
  const [houseFormState, setHouseFormState] = useState({
    houseAddress: '',
    housePhoto: '',
    houseCode: ''
  });
  
  const [houseState, setHouseState] = useState('create')

  const handleChange = (event) => {
    const { name, value } = event.target;

    setHouseFormState({
      ...houseFormState,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        Are you joining a sharehouse or creating your own?
      </div>
      <div className = "mb-3">
      <button type="button" className = "btn btn-primary" onClick={() => setHouseState('join')}>Join a sharehouse</button>
      <button type="button" className = "btn btn-primary" onClick={() => setHouseState('create')}>Create a sharehouse</button>
      </div>
      {
        houseState === 'join' ?
          (<div className = "mb-3">
          <label className = "form-label" for="houseCode">Code you should have gotten from your housemate</label>
            <input
              className="form-control"
              name="houseCode"
              id="houseCode"
              value={houseFormState.houseCode}
              placeholder="code you should have gotten"
              onChange={handleChange}
              />
          </div>
          ) : (
            <div>
              <div className = "mb-3">
              <label className = "form-label" for="houseCode">Your property's address</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="address"
                  name="houseAddress"
                  value={houseFormState.houseAddress}
                  onChange={handleChange}
                />
              </div>
              <div className = "mb-3">
                <label className = "form-label" for="houseCode">Create a house code to share with your friends</label>
                <input
                  className="form-control"
                  id="houseCode"
                  name="houseCode"
                  value={houseFormState.houseCode}
                  placeholder="code to share with your friends"
                  onChange={handleChange}
                />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default HouseForm
