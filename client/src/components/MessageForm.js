import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import UploadForm from "./UploadForm"
import { ADD_MESSAGE } from "../utils/mutations"

import Auth from "../utils/auth";

const MessageForm = ({ handleMessagePost }) => {
  const [messageText, setMessageText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [fileName,setFileName] = useState();

  const handlePhoto = (photo)=>{
    const photoName = photo.photo
    console.log(photoName)
    setFileName(photoName)
    console.log(fileName)
  }

  const [addMessage, { error , data }] = useMutation(ADD_MESSAGE)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(messageText)
    try {
      const { data } = await addMessage({
        variables: {
          message: messageText,
          photo:fileName
        },
      });
      setMessageText("");
      handleMessagePost()
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "messageText" && value.length <= 280) {
      setMessageText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className = "card shadow border-0 m-3">
      <h4 className="custom-bg-darkblue text-white p-2 text-center">Post a new message</h4>
      {Auth.loggedIn() ? (
        <div className = "card-body">
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
              <textarea
                name="messageText"
                placeholder="Add a new message here"
                value={messageText}
                className="form-control mb-3"
                rows = "2"
                onChange={handleChange}
              ></textarea>
            </div>
            <UploadForm handlePhoto = {handlePhoto}/>
            <div className="text-center">
              <button className="btn btn-primary my-3" type="submit">
                Post
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
  );
};

export default MessageForm;
