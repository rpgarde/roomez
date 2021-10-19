import React from 'react';

const style = {
    width:"25rem"
}

function Project(props) {
    return (
        <div className="card m-3" style={style}>
            <img src={props.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title fw-bold">{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text">{props.tech}</p>
            </div>
            <div className="card-body">
                <a href={props.repo} className="btn btn-dark mx-1">Repo</a>
                <a href={props.deployed}
                    className="btn btn-dark mx-1">Deployed site</a>
            </div>
        </div>
    )
}

export default Project