import React from 'react';
import Auth from '../utils/auth'
import {useQuery} from '@apollo/client'
import {Link} from 'react-router-dom'
import {QUERY_BILL,QUERY_CHORE,QUERY_MESSAGE} from '../utils/queries'

export default function Home() {

    
    const { loading:billLoading, data:billData } = useQuery(QUERY_BILL)
    const bills = billData?.bill || []
    const unpaidBills = bills.filter(bill=>!bill.paid&&bill.dueAt>=new Date())

    const { loading:choreLoading, data:choreData } = useQuery(QUERY_CHORE)
    const chores = choreData?.chore || []
    const incompleteChores = chores.filter(chore=>!chore.complete&&chore.dueAt>=new Date())

    const { loading:messageLoading, data:messageData , refetch } = useQuery(QUERY_MESSAGE)
    const messages = messageData?.message || []
    
    return (
        <div className = "container-lg px-4">
            <h4 className = "text-center mt-4 fw-bold">Welcome to roomEZ, {Auth.getProfile().data.firstName}.</h4>
            <h5 className = "text-center mb-4">Some things you might have missed at {Auth.getProfile().data.house.address}</h5>
            <div className="row d-flex justify-content-evenly">
                <div className="shadow custom-bg-darkblue text-white rounded col-5 col-md-3 mb-3">
                    <div className="card-body text-center">
                    <h1 className = "fw-bold">{billLoading?('...'):(unpaidBills.length)}</h1>
                        <p>Unpaid Bills</p>
                        <Link to ='/bills'>
                        <button className = "shadow btn btn-warning btn-sm">Pay your bills</button>
                        </Link>
                    </div>
                </div>
                <div className="shadow custom-bg-darkblue text-white rounded col-5 col-md-3 mb-3">
                    <div className="card-body text-center">
                        <h1 className = "fw-bold">{choreLoading?('...'):incompleteChores.length}</h1>
                        <p>Incomplete Chores</p>
                        <Link to ='/chores'>
                        <button className = "shadow btn btn-warning btn-sm">Do your chores</button>
                        </Link>
                    </div>
                </div>
                <div className="shadow custom-bg-darkblue text-white rounded col-5 col-md-3 mb-3">
                    <div className="card-body text-center">
                    <h1 className = "fw-bold">{messageLoading?('...'):messages.length}</h1>
                        <p>Total Messages</p>
                        <Link to ='/messages'>
                        <button className = "shadow btn btn-warning btn-sm">Send a message</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}