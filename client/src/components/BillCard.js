import React, {useState} from 'react';
import Moment from 'react-moment';

function BillCard(props) {
    let imgString = '/images/'+props.photo

    const [paidStatus,setPaidStatus] = useState(props.complete)

    const handleClick = async(event)=>{
        event.preventDefault()
        setPaidStatus(!paidStatus)
    }
    return (
         <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title fw-bold">{props.name}</h5>
                <span className={props.isOverdue?"badge bg-danger mb-3":"badge bg-warning text-dark mb-3"}>Due: <Moment format = "ddd, D MMM" parse = "x">{props.dueAt}</Moment></span> 
                {props.completedAt&&<span className="badge bg-success mx-2 mb-3">Paid: <Moment format = "ddd, D MMM" parse = "x">{props.paidAt}</Moment></span>}
                <p className="card-text">Assigned to: {props.assignedTo}</p>
                <div>{props.photo ? (<img className = 'img-thumbnail mb-3' src = {imgString}/>) : null}</div>
                {paidStatus?(
                <button type = "button" className = "btn btn-secondary" onClick = {handleClick}>Mark Incomplete</button>
                ):(
                <button type = "button" className = "btn btn-primary" onClick = {handleClick}>Mark Complete</button>
                )}
            </div>
        </div>

    )
}

export default BillCard