import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import BillCard from '../components/BillCard'
import BillForm from '../components/BillForm'
import { QUERY_BILL, QUERY_HOUSE } from '../utils/queries';
import Auth from '../utils/auth';

export default function Bill() {
  const { loading, data, refetch } = useQuery(QUERY_BILL)
  console.log(data)
  const bills = data?.bill || []
  const [postSuccess, setPostSuccess] = useState(false)

  const paidBills = bills.filter(bill => bill.paid)
  const unpaidBills = bills.filter(bill => !bill.paid && bill.dueAt >= new Date())
  const overdueBills = bills.filter(bill => !bill.paid && bill.dueAt < new Date())

  const handleBillPost = () => {
    setPostSuccess(true)
    refetch()
    setTimeout(() => setPostSuccess(false), 3000)
  }

  let currentHouseId
  if (Auth.loggedIn()) {
    currentHouseId = Auth.getProfile().data.house._id
  }

  const { loading:houseLoading, data:houseData } = useQuery(QUERY_HOUSE, {
    variables: {
      _id: currentHouseId ? currentHouseId : null
    }
  });

  const house = houseData?.house[0] || {}
  const occupants = house?.occupants || []

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center mb-4">
        <BillForm handleBillPost={handleBillPost} />
        {postSuccess && <div className="alert alert-success">Post successful!</div>}
      </div>
      {loading ? <h1>Now loading...</h1>
        : (<div className="row">
          <div className="col-md-4 custom-bg-light-blue">
            <h4 className="fw-bold text-center mt-3">To Pay ({unpaidBills.length})</h4>
            {unpaidBills && unpaidBills.map((bill) => (
              <BillCard
                name={bill.name}
                message={bill.message}
                createdAt={bill.createdAt}
                dueAt={bill.dueAt}
                assignedTo={bill.assignedTo.firstName}
                createdBy={bill.createdBy.firstName}
                photo={bill.photo}
                _id={bill._id}
                amount={bill.amount}
                paidAt={bill.paidAt}
                paid={bill.paid}
                key={bill._id}
                isArchived={bill.isArchived}
                refetch={refetch}
                occupants = {occupants.length}
              />
            ))}
          </div>
          <div className="col-md-4 custom-bg-light-blue">
            <h4 className="fw-bold text-center mt-3">Overdue ({overdueBills.length})</h4>
            {overdueBills && overdueBills.map((bill) => (
              <BillCard
                name={bill.name}
                message={bill.message}
                createdAt={bill.createdAt}
                dueAt={bill.dueAt}
                assignedTo={bill.assignedTo.firstName}
                createdBy={bill.createdBy.firstName}
                photo={bill.photo}
                _id={bill._id}
                amount={bill.amount}
                paidAt={bill.paidAt}
                paid={bill.paid}
                key={bill._id}
                isOverdue={true}
                isArchived={bill.isArchived}
                refetch={refetch}
                occupants = {occupants.length}
              />
            ))}
          </div>

          <div className="col-md-4 custom-bg-light-blue">
            <h4 className="fw-bold text-center mt-3">Paid ({paidBills.length})</h4>
            {paidBills && paidBills.map((bill) => (
              <BillCard
                name={bill.name}
                message={bill.message}
                createdAt={bill.createdAt}
                dueAt={bill.dueAt}
                assignedTo={bill.assignedTo.firstName}
                createdBy={bill.createdBy.firstName}
                photo={bill.photo}
                _id={bill._id}
                amount={bill.amount}
                paidAt={bill.paidAt}
                paid={bill.paid}
                key={bill._id}
                isArchived={bill.isArchived}
                refetch={refetch}
                occupants = {occupants.length}
              />
            ))}
          </div>
        </div>)}

    </div>
  );
}
