import React, {useState} from 'react';
import {useQuery} from '@apollo/client'

import BillCard from '../components/BillCard'
import BillForm from '../components/BillForm'
import { QUERY_BILL } from '../utils/queries';

export default function Bill() {
const { loading, data, refetch } = useQuery(QUERY_BILL)
console.log(data)
const bills = data?.bill || []
const [postSuccess, setPostSuccess] = useState(false)

const handleBillPost = () => {
    setPostSuccess(true)
    refetch()
    setTimeout(() => setPostSuccess(false), 3000)
  }


  if (loading) {
    return <div>Loading...</div>;
  }

console.log(bills)
    return (
        <div>
        <h1 className = "text-center mb-3 fw-bold">Bills</h1>
        <BillForm handleBillPost = {handleBillPost}/>
            {postSuccess && <div className = "alert alert-success">Post successful!</div>}

        <div className>
        {bills.map((bill)=>(
        <BillCard
        name = {bill.name}
        message = {bill.message}
        createdAt = {bill.createdAt}
        dueAt = {bill.dueAt}
        assignedTo = {bill.assignedTo.firstName}
        createdBy = {bill.createdBy.firstName}
        photo = {bill.photo}
        _id = {bill.id}
        amount = {bill.amount}
        paidAt = {bill.paidAt}
        paid = {bill.paid}
        key={bill.id}
        />
        ))}
        </div>
      </div>
      );
}
