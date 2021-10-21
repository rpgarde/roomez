import React from 'react';
import {useQuery} from '@apollo/client'

import MessageCard from '../components/MessageCard'

import { QUERY_MESSAGE } from '../utils/queries';

export default function Message() {
const { loading, data } = useQuery(QUERY_MESSAGE)
const messages = data?.message || []

console.log(messages)
    return (
        <div>
        <h1 className = "text-center mb-3 fw-bold">Messages</h1>
        <div className>
        {messages.map((message)=>(
        <MessageCard
        name = {message.createdBy.firstName}
        message = {message.message}
        createdAt = {message.createdAt}
        photo = {message.photo}
        _id = {message.id}
        />
        ))}
        </div>
      </div>
      );
}
