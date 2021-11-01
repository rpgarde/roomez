import React from 'react';
import Moment from 'react-moment';

function ChoreCard(props) {
    let imgString = '/images/'+props.photo

    return (
        <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title fw-bold">{props.name} - due on <Moment format = "ddd, Do MMM YYYY" parse = "x">{props.dueAt}</Moment></h5>
                <p className="card-text">Created By: {props.createdBy}</p>
                <p className="card-text">Assigned to: {props.assignedTo}</p>
                <p className="card-text">Complete: {props.complete ? `Yes` : `No`}</p>
                {props.photo ? (<img src = {imgString}/>) : null}
            </div>
        </div>
    )
}

export default ChoreCard