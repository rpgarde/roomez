import React from 'react';

function MessageCard(props) {
    return (
        <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title fw-bold">Posted by {props.name} on {props.createdAt}</h5>
                <p className="card-text">{props.message}</p>
            </div>
        </div>
    )
}

export default MessageCard