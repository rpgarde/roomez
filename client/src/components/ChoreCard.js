import React, {useState,useEffect} from "react";
import Moment from "react-moment";
import { useMutation } from "@apollo/client";
import { EDIT_CHORE } from "../utils/mutations";
import Auth from "../utils/auth";

function ChoreCard(props) {

  const refetch = props.refetch

  const [completeStatus,setCompleteStatus] = useState(props.complete)
  const [isArchived,setIsArchived] = useState(false)

  const [editChore,{ error, data }] = useMutation(EDIT_CHORE)

  const handleClick = async (event) => {
    event.preventDefault()
    try{
      const {data} = await editChore({
        variables:{
          _id:props._id,
          complete:completeStatus
        }
      })
      refetch()
      console.log(data)
    }
    catch(err){
      console.log(error)
      console.error(err)
    }
  }
  const handleArchive = async(event)=>{
    event.preventDefault()
    try{
      const {data} = await editChore({
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
            <h5 className="card-title fw-bold">{props.name}</h5>
            <span className={props.isOverdue?"badge bg-danger mb-3":"badge bg-warning text-dark mb-3"}>Due: <Moment format = "ddd, D MMM" parse = "x">{props.dueAt}</Moment></span> 
            {props.completedAt&&<span className="badge bg-success mx-2 mb-3">Completed: <Moment format = "ddd, D MMM" parse = "x">{props.completedAt}</Moment></span>}
            <p className="card-text">Assigned to: {props.assignedTo}</p>
            {props.photo && (<a href = {props.photo}><img className = 'img-thumbnail mb-3' src = {props.photo}/></a>)}
            <div className = "d-flex justify-content-between">                
              {completeStatus?(
                <button type = "button" className = "btn btn-secondary" onClick = {handleClick}>Mark Incomplete</button>
              ):(
                <button type = "button" className = "btn btn-primary" onClick = {handleClick}>Mark Complete</button>
              )}
              <button type="button" className="btn btn-outline-danger" onClick = {handleArchive}>Archive</button>
            </div>
          </div>
        </div>
  )
}

export default ChoreCard