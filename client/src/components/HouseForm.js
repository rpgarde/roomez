import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const HouseForm = () => {
  const [formState, setFormState] = useState({
    houseName: '',
    houseAddress: '',
    housePhoto: ''
  });

  const [houseState, setHouseState] = useState('create')

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        Are you joining a sharehouse or creating your own?
      </div>
      <button type="button" onClick={() => setHouseState('join')}>Join a sharehouse</button>
      <button type="button" onClick={() => setHouseState('create')}>Create a sharehouse</button>

      {
        houseState === 'join' ?
          (<div>
            <input placeholder="code you should have gotten" />
          </div>
          ) : (
            <div>
              <div>
                <input id="address" placeholder="address" />
              </div>
              <div>
                <input placeholder="code to share with your friends" />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default HouseForm
