import React, {useState} from 'react';
import Moment from 'react-moment';
import { useMutation } from '@apollo/client';
import { EDIT_BILL } from '../utils/mutations';
import Auth from '../utils/auth';

function BillCard(props) {

    const refetch = props.refetch
    const [paidStatus,setPaidStatus] = useState(props.paid)
    const [isArchived,setIsArchived] = useState(false)

    const [editBill, {error,data}] = useMutation(EDIT_BILL)
    
    const handlePaid = async(event)=>{
        event.preventDefault()
        try{
            // console.log(props._id)
            // console.log(paidStatus)
            const {data} = await editBill({
                variables:{
                    _id:props._id,
                    paid:paidStatus
                }
            })
            setPaidStatus(!paidStatus)
            refetch()
        }
        catch(err){
            console.error(err)
        }
    }

    const handleArchive = async(event)=>{
        event.preventDefault()
        try{
            const {data} = await editBill({
                variables:{
                    _id:props._id,
                    isArchived:true
                }
            })
            setIsArchived(true)
            refetch()
        }
        catch(err){
            console.error(err)
        }
    }


    return (
        !isArchived&&
         <div className={Auth.getProfile().data.firstName==props.assignedTo?"shadow card m-3 border-warning border-2":"shadow card m-3"}>
            <div className="card-body">
                <div className = "d-flex justify-content-between">
                    <h5 className="card-title fw-bold">{props.name}</h5>
                    <h5 className="card-title fw-bold">${props.amount} {props.occupants>1&&<span className = "font-half fw-lighter">(${Math.round(props.amount/props.occupants)} each)</span>}</h5>
                </div>
                <span className={props.isOverdue?"badge bg-danger mb-3":"badge bg-warning text-dark mb-3"}>Due: <Moment format = "ddd, D MMM" parse = "x">{props.dueAt}</Moment></span> 
                {paidStatus&&<span className="badge bg-success mx-2 mb-3">Paid: <Moment format = "ddd, D MMM" parse = "x">{props.paidAt}</Moment></span>}
                <p className="card-text">Assigned to: {props.assignedTo}</p>
                {props.photo && (<a href = {props.photo}><img className = 'img-thumbnail mb-3' src = {props.photo}/></a>)}
                <div className = "d-flex justify-content-between">
                {paidStatus?(
                <button type = "button" className = "btn btn-secondary" onClick = {handlePaid}>Mark Unpaid</button>
                ):(
                <button type = "button" className = "btn btn-primary" onClick = {handlePaid}>Mark Paid</button>
                )}
                <button type="button" class="btn btn-outline-danger" onClick = {handleArchive}>Archive</button>
                </div>
            </div>
        </div>

    )
}

export default BillCard