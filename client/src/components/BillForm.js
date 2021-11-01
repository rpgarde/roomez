import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { ADD_BILL } from '../utils/mutations'
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";


import Auth from '../utils/auth';

const BillForm = ({ handleBillPost }) => {
  const [billText, setBillText] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [amount,setAmount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0);

  const [addBill, { error, data }] = useMutation(ADD_BILL)

  const { loading, error: queryError, data: queryData } = useQuery(QUERY_USER)
  const users = queryData?.user || []

  function onDateChange(date) {
    setDate(date);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted form')
    try {
      console.log(billText)
      console.log(assignedTo)
      console.log(date)
      console.log(amount)
      console.log(typeof(amount))
        const { data } = await addBill({
          variables: {
            name: billText,
            assignedTo: assignedTo,
            dueAt: date,
            amount: Number(amount)
          },
        });
      console.log(data)
      setBillText('');
      setAssignedTo('')
      handleBillPost()
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignedTo = (event) => {
    setAssignedTo(event.target.value)
  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'billText' && value.length <= 40) {
      setBillText(value);
      setCharacterCount(value.length);
    }

    if (name === 'amount' && value.length <= 10) {
      setAmount(value);
    }
  };

  return (
    <div className="m-3">
      <h3 className = "mb-3 text-center">Add a new bill</h3>

      {Auth.loggedIn() ? (
        <div className = "col-6 offset-3">
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-3">
                <label className="form-label" htmlFor="assignedTo">Assign To</label>
                <select
                  id="assignedTo"
                  className="form-select form-select-sm"
                  name="assignedTo"
                  onChange={handleAssignedTo}>
                  <option selected value=''>Select</option>
                  {users.map((user) => (
                    <option value={user._id}>{user.firstName}</option>
                  ))
                  }
                </select>
                </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="dueDate">Due Date</label>
                <div>
                <DayPickerInput className="form-control" id="dueDate" onDayChange={onDateChange} />
                </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="billText">Bill description</label>
              <input
                id="billText"
                name="billText"
                placeholder="What bill is this?"
                value={billText}
                className="form-control w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
              <span
                className={`form-text ${characterCount === 40 || error ? 'text-danger' : ''
                  }`}
              >
                Character Count: {characterCount}/40
              </span>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="amount">Amount</label>
              <input
                type = "number"
                id="amount"
                name="amount"
                placeholder="How much is the bill?"
                value={amount}
                className="form-control"
                onChange={handleChange}
              ></input>
            </div>
            <div className="text-center">
              <button className="btn btn-primary" type="submit">
                Add Bill
              </button>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </div>
      ) : (
        <p>
          You need to be logged in to post bills. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BillForm;
