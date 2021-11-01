import React from 'react';
import Moment from 'react-moment';

function MessageCard(props) {
    return (
        <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title fw-bold">Posted by {props.name} on <Moment format = "ddd, Do MMM YYYY" parse = "x">{props.createdAt}</Moment></h5>
                <p className="card-text">{props.message}</p>
            </div>
        </div>
        // <div>
        //     {messages.map((message)=>(
        //                     <div className="card-body">
        //         <h5 className="card-title fw-bold">Posted by {message.createdBy.firstName} on {message.createdAt}</h5>
        //         <p className="card-text">{message.message}</p>
        //         </div>
        //     ))}
        // </div>
    )

}

export default MessageCard