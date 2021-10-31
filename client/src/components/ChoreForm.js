import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { ADD_CHORE } from '../utils/mutations'

import Auth from '../utils/auth';

const ChoreForm = ({ handleMessagePost }) => {
  const [choreText, setChoreText] = useState('');
  const [assignedTo,setAssignedTo] = useState('');
  
  const [characterCount, setCharacterCount] = useState(0);

  const [addChore, { error , data }] = useMutation(ADD_CHORE)

  const { loading, error:queryError, data:queryData } = useQuery(QUERY_USER)
  const users = queryData?.user || []

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted form')
    try {
      console.log(choreText)
      console.log(assignedTo)
    //   const { data } = await addChore({
    //     variables: {
    //       name: choreText,
    //       assignedTo: assignedTo
    //     },
    //   });
      setChoreText('');
      setAssignedTo('')
      // handleMessagePost()
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignedTo = (event) => {
    setAssignedTo(event.target.value)
  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'messageText' && value.length <= 280) {
      setChoreText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className = "m-3">
      <h3>Add a new chore</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 120 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/120
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <select className="form-select form-select-sm" name = "assignedTo" onChange = {handleAssignedTo}>
            <option selected value = ''>Select who to assign to</option>
            {users.map((user)=>(
              <option value = {user._id}>{user.firstName}</option>
            ))
            }
          </select>

            <div className="col-12">
              <input
                name="messageText"
                placeholder="Add a new message here"
                value={choreText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary" type="submit">
                Add Chore
              </button>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to leave messages. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ChoreForm;
