import React from 'react';
import Moment from 'react-moment';
import Auth from '../utils/auth';

function MessageCard(props) {

    const {data} = Auth.getProfile()

    return (
        <div className={data.firstName===props.name?"m-3 d-flex justify-content-end":"m-3 d-flex justify-content-start"}>
            <div className = "col-8 card shadow-sm border-0">
            <div className={data.firstName===props.name?"card-body rounded text-end text-white custom-bg-darkblue":"card-body rounded custom-bg-light-blue"}>
                <h5 className="card-title fw-bold">{props.name}</h5>
                <h6 class="card-subtitle mb-2 text-white-50 font-smallest"><Moment format = "LLL" parse = "x">{props.createdAt}</Moment></h6>
                <p className="card-text">{props.message}</p>
            </div>
            </div>
        </div>
    )

}

export default MessageCard