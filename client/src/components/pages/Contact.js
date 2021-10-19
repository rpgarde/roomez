import React, { useState } from 'react';

// Here we import a helper function that will check if the email is valid
import { validateEmail, validateField } from '../utils/helpers';

function Contact() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'name') {
      setName(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  const handleFormBlur = (e) => {
    if (!validateField(name) || !validateField(email) || !validateField(message)) {
      setErrorMessage('Please fill up all the fields');
    }
    else if (!validateEmail(email)) {
      setErrorMessage('Email is invalid');
    }
    else {
      setErrorMessage('')
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateField(name) || !validateField(email) || !validateField(message)) {
      setErrorMessage('Please fill up all the fields');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email is invalid');
      return;
    }

    setErrorMessage('Hi, this form does not work yet. In the meantime, contact me through +61412957544 or rpgarde@gmail.com')

    setName('');
    setMessage('');
    setEmail('');
  };

  return (
    <div className="row">
      <h1 className="text-center fw-bold">Get in touch</h1>
      <div className = "col-6 offset-3">
      <form className="form">
        <div class="mb-3">
          <label className = "form-label" for="email">Email</label>
          <input
            value={email}
            className = "form-control"
            id="email"
            name="email"
            onChange={handleInputChange}
            onBlur={handleFormBlur}
            type="email"
            placeholder="email"
          />
        </div>
        <div class="mb-3">
        <label className = "form-label" for="email">Name</label>
          <input
            value={name}
            className = "form-control"
            id="name"
            name="name"
            onChange={handleInputChange}
            onBlur={handleFormBlur}
            type="text"
            placeholder="name"
          />
        </div>
        <div class="mb-3">
        <label className = "form-label" for="message">Message</label>
          <textarea
            value={message}
            className = "form-control"
            id="message"
            name="message"
            onChange={handleInputChange}
            onBlur={handleFormBlur}
            type="message"
            placeholder="message"
          />
        </div>
        <div>
          {errorMessage.length>0 ?
            (<p className="alert alert-danger">{errorMessage}</p>)
            :
            (<p></p>)
          }
      </div>
      <div  className = "text-center mb-3">
        <button type="button" className="btn btn-dark" onClick={handleFormSubmit}>Submit</button>
      </div>
      </form>
      </div>
    </div>
  );
}

export default Contact;
