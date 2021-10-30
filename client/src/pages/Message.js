import React, { useState } from 'react';
import {useQuery} from '@apollo/client'

import MessageCard from '../components/MessageCard'
import MessageForm from '../components/MessageForm'

import { QUERY_MESSAGE } from '../utils/queries';

export default function Message() {
const { loading, data , refetch } = useQuery(QUERY_MESSAGE)
const messages = data?.message || []
const [postSuccess, setPostSuccess] = useState(false)

const handleMessagePost = () => {
  setPostSuccess(true)
  refetch()
  setTimeout(() => setPostSuccess(false), 3000)
}


console.log(messages)
    return (
        <div className = "container-fluid">
        <h1 className = "text-center mb-3 fw-bold">Messages</h1>
        <div>
        <MessageForm handleMessagePost = {handleMessagePost}/>
        {postSuccess && <div className = "alert alert-success">Post successful!</div>}
        {/* <MessageCard 
        messages = {messages}
        /> */}
        {messages && 
        messages.map((message)=>(
        <MessageCard
        name = {message.createdBy.firstName}
        message = {message.message}
        createdAt = {message.createdAt}
        photo = {message.photo}
        _id = {message.id}
        house = {message.house.address}
        />
        ))}
        </div>
      </div>
      );
}