import React from 'react';
import {useQuery} from '@apollo/client'

import BillCard from '../components/BillCard'

import { QUERY_BILL } from '../utils/queries';

export default function Bill() {
const { loading, data } = useQuery(QUERY_BILL)
const bills = data?.bill || []
console.log(bills)

console.log(bills)
    return (
        <div>
        <h1 className = "text-center mb-3 fw-bold">Bills</h1>
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
        />
        ))}
        </div>
      </div>
      );
}
