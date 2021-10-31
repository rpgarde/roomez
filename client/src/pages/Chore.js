import React, {useState} from 'react';
import { useQuery } from '@apollo/client'

import { QUERY_CHORE, QUERY_USER } from '../utils/queries'

import ChoreCard from '../components/ChoreCard'
import ChoreForm from '../components/ChoreForm'

export default function Chore() {
    const { loading, data , refetch } = useQuery(QUERY_CHORE)
    const chores = data?.chore || []
    const [postSuccess, setPostSuccess] = useState(false)

    const handleChorePost = () => {
        setPostSuccess(true)
        refetch()
        setTimeout(() => setPostSuccess(false), 3000)
      }
      
    console.log(chores)
    return (
        <div className = "container-fluid">
        <h1 className = "text-center my-3 fw-bold">Chores</h1>
            <ChoreForm handleChorePost = {handleChorePost}/>
            {postSuccess && <div className = "alert alert-success">Post successful!</div>}
            <div>
                {chores.map((chore) => (
                    <ChoreCard
                        createdAt={chore.createdAt}
                        name={chore.name}
                        dueAt={chore.dueAt}
                        house={chore.house.address}
                        createdBy={chore.createdBy.firstName}
                        assignedTo={chore.assignedTo.firstName}
                        complete={chore.complete}
                        completedAt={chore.completedAt}
                        photo={chore.photo}
                    />
                ))}
            </div>
        </div>
    );
}
