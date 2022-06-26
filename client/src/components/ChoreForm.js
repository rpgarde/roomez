import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries"
import { ADD_CHORE } from "../utils/mutations"
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import UploadForm from "./UploadForm"

import Auth from "../utils/auth";

const ChoreForm = ({ handleChorePost }) => {
  const [choreText, setChoreText] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [date, setDate] = useState(new Date());

  const [fileName, setFileName] = useState();

  function onDateChange(date) {
    setDate(date);
  }
  const handlePhoto = (photo) => {
    const photoName = photo.photo
    console.log(photoName)
    setFileName(photoName)
    console.log(fileName)
  }


  const [characterCount, setCharacterCount] = useState(0);

  const [addChore, { error, data }] = useMutation(ADD_CHORE)

  const { loading, error: queryError, data: queryData } = useQuery(QUERY_USER)
  const users = queryData?.user || []

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted form")
    try {
      console.log(choreText)
      console.log(assignedTo)
      console.log(date)
      const { data } = await addChore({
        variables: {
          name: choreText,
          assignedTo: assignedTo,
          dueAt: date,
          photo: fileName
        },
      });
      setChoreText("");
      setAssignedTo("")
      handleChorePost()
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignedTo = (event) => {
    setAssignedTo(event.target.value)
  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "choreText" && value.length <= 280) {
      setChoreText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="mx-auto col-12 col-lg-6 col-xxl-4">
      <div className="shadow card m-3 border-0">
        <h4 className="custom-bg-darkblue text-white p-2 text-center">Add a new chore</h4>
        {Auth.loggedIn() ? (
          <div className="col-6 offset-3">
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
                    <option key={user._id} value={user._id}>{user.firstName}</option>
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
                <label className="form-label" htmlFor="choreText">Chore description</label>
                <input
                  id="choreText"
                  name="choreText"
                  placeholder="What chore is this?"
                  value={choreText}
                  className="form-control w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                ></input>
                <span
                  className={`form-text ${characterCount === 120 || error ? "text-danger" : ""
                  }`}
                >
                  Character Count: {characterCount}/120
                </span>
              </div>
              <UploadForm handlePhoto={handlePhoto} />
              <div className="text-center">
                <button className="btn btn-primary my-3" type="submit">
                  Add Chore
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
            You need to be logged in to leave messages. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ChoreForm;
