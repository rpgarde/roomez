import React, { useState } from 'react';
import {useQuery} from '@apollo/client'

import MessageCard from '../components/MessageCard'
import MessageForm from '../components/MessageForm'

import { QUERY_MESSAGE } from '../utils/queries';

export default function Message() {
const { loading, data , refetch } = useQuery(QUERY_MESSAGE)
const messages = data?.message || []
const [postSuccess, setPostSuccess] = useState(false)
const [messageCount,setMessageCount] = useState(10)

const handleMessagePost = () => {
  setPostSuccess(true)
  refetch()
  setTimeout(() => setPostSuccess(false), 3000)
}

const handleMessageCount = (event) => {
  setMessageCount(event.target.value)
  console.log(setMessageCount)
}

console.log(messages)
    return (
        <div className = "container-fluid">
                  <h1 className = "text-center mb-3 fw-bold">Messages</h1>
          <div className = "d-flex justify-content-center">
            <div className = "col-lg-6 col-md-8">
            <MessageForm handleMessagePost = {handleMessagePost}/>
            {postSuccess && <div className = "alert alert-success">Post successful!</div>}
            {/* <MessageCard 
            messages = {messages}
            /> */}
            {messages && 
            messages.slice(0,messageCount).map((message)=>(
            <MessageCard
            name = {message.createdBy.firstName}
            message = {message.message}
            createdAt = {message.createdAt}
            photo = {message.photo}
            _id = {message.id}
            house = {message.house.address}
            />
            ))}
                    <div className="my-3">
                <label className="form-label text-center" htmlFor="assignedTo">Showing the last {messageCount} messages</label>
                <select
                  id="assignedTo"
                  className="form-select form-select-sm"
                  name="assignedTo"
                  onChange={handleMessageCount}>
                  <option selected value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                </select>
                </div>
          </div>
          
        </div>
        
      </div>
      );
}