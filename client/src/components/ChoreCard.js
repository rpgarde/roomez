import React, {useState,useEffect} from 'react';
import Moment from 'react-moment';
import { useMutation } from '@apollo/client';
import { EDIT_CHORE } from '../utils/mutations';

function ChoreCard(props) {
    let imgString = '/images/'+props.photo

    const [completeStatus,setCompleteStatus] = useState()

    const [editChore,{error,data}] = useMutation(EDIT_CHORE)

    useEffect(()=>{
        console.log('use effect '+completeStatus)
    },[completeStatus])


    const handleClick = async (event) => {
        event.preventDefault()
        try{
        console.log('id: '+props._id)
        // console.log('before:'+completeStatus)
        // console.log('during'+!completeStatus)
        setCompleteStatus(!props.completed)
        console.log('after:'+completeStatus)
        // const {data} = await editChore({
        //     variables:{
        //         _id:props._id,
        //         complete:completeStatus
        //     }
        // })
        console.log(data)
         }
         catch(err){
             console.log(error)
             console.error(err)
         }
    }

    return (
        <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title fw-bold">{props.name} - due on <Moment format = "ddd, Do MMM YYYY" parse = "x">{props.dueAt}</Moment></h5>
                {completeStatus?(
                <button className = "btn btn-secondary" onClick = {handleClick}>Mark Incomplete</button>
                ):(
                <button className = "btn btn-primary" onClick = {handleClick}>Mark Complete</button>
                )}
                <p className="card-text">Created By: {props.createdBy}</p>
                <p className="card-text">Assigned to: {props.assignedTo}</p>
                <p className="card-text">Complete: {props.completed ? `Yes` : `No`}</p>
                {props.completed&&(<p className = "card-text">Completed On: {props.completedAt}</p>)}
                {props.photo ? (<img src = {imgString}/>) : null}
            </div>
        </div>
    )
}

export default ChoreCard