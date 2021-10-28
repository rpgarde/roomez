import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HouseForm = (props) => {
  // const [houseFormState, setHouseFormState] = useState({
  //   houseAddress: '',
  //   housePhoto: '',
  //   houseCode: ''
  // });
  
  const [address, setHouseAddress] = useState('');
  const [code, setHouseCode] = useState('');

  const [houseState, setHouseState] = useState('create')

  const handleCodeChange = (event)=> {
    const {value} = event.target;

    setHouseCode(value)

    props.handleHouseForm({
      code: value,
    })
  }

  const handleAddressChange = (event)=> {
    const {value} = event.target;

    setHouseAddress(value)

    props.handleHouseForm({
      address: value,
    })
  }


  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setHouseFormState({
  //     ...houseFormState,
  //     [name]: value,
  //   });

  //   props.handleHouseForm({
  //     ...houseFormState,
  //     [name]: value,
  //   })
  // };

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
          <label className = "form-label" htmlFor="houseCode">Code you should have gotten from your housemate</label>
            <input
              className="form-control"
              name="houseCode"
              id="houseCode"
              value={code}
              placeholder="code you should have gotten"
              onChange={handleCodeChange}
              />
          </div>
          ) : (
            <div>
              <div className = "mb-3">
              <label className = "form-label" htmlFor="houseCode">Your property's address</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="address"
                  name="houseAddress"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className = "mb-3">
                <label className = "form-label" htmlFor="houseCode">Create a house code to share with your friends</label>
                <input
                  className="form-control"
                  id="houseCode"
                  name="houseCode"
                  value={code}
                  placeholder="code to share with your friends"
                  onChange={handleCodeChange}
                />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default HouseForm
