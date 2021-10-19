import React from 'react';

export function Skill (props){
    return(
        <li className = "list-group-item d-flex justify-content-between align-items-center">
                    {props.skill}
                <span class="badge bg-dark rounded-pill">{props.rating}</span>
                </li>
    )
}