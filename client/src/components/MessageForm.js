import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MESSAGE } from '../utils/mutations'

import Auth from '../utils/auth';

const MessageForm = ({ handleMessagePost }) => {
  const [messageText, setMessageText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addMessage, { error , data }] = useMutation(ADD_MESSAGE)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(messageText)
    try {
      const { data } = await addMessage({
        variables: {
          message: messageText
        },
      });
      setMessageText('');
      handleMessagePost()
      // window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'messageText' && value.length <= 280) {
      setMessageText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className = "m-3">
      <h3>Leave a message</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="messageText"
                placeholder="Here's a new message..."
                value={messageText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary" type="submit">
                Add Message
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

export default MessageForm;
