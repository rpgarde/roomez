import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import { QUERY_CHORE, QUERY_USER } from '../utils/queries'

import ChoreCard from '../components/ChoreCard'
import ChoreForm from '../components/ChoreForm'

export default function Chore() {
    const { loading, data, refetch } = useQuery(QUERY_CHORE)
    const chores = data?.chore || []
    const [postSuccess, setPostSuccess] = useState(false)

    const completedChores = chores.filter(chore => chore.complete)
    const incompleteChores = chores.filter(chore => !chore.complete && chore.dueAt >= new Date())
    const overdueChores = chores.filter(chore => !chore.complete && chore.dueAt < new Date())

    const handleChorePost = () => {
        setPostSuccess(true)
        refetch()
        setTimeout(() => setPostSuccess(false), 3000)
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center mb-4">
                <ChoreForm handleChorePost={handleChorePost} />
                {postSuccess && <div className="alert alert-success">Post successful!</div>}
            </div>
            {loading ? <h1>Now loading...</h1>
                : (<div className="row">
                    <div className="col-md-4 custom-bg-light-blue">
                        {chores.length>0&&<h4 className="fw-bold text-center mt-3">To-do ({incompleteChores.length})</h4>}
                        {incompleteChores && incompleteChores.map((chore) => (
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
                                _id={chore._id}
                                isArchived={chore.isArchived}
                                refetch={refetch}
                            />
                        ))}
                    </div>
                    <div className="col-md-4 custom-bg-light-blue">
                        {chores.length>0&&<h4 className="fw-bold text-center mt-3">Overdue ({overdueChores.length})</h4>}
                        {overdueChores && overdueChores.map((chore) => (
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
                                _id={chore._id}
                                isOverdue={true}
                                isArchived={chore.isArchived}
                                refetch={refetch}
                            />
                        ))}
                    </div>

                    <div className="col-md-4 custom-bg-light-blue">
                        {chores.length>0&&<h4 className="fw-bold text-center mt-3">Done ({completedChores.length})</h4>}
                        {completedChores && completedChores.map((chore) => (
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
                                _id={chore._id}
                                isArchived={chore.isArchived}
                                refetch={refetch}
                            />
                        ))}
                    </div>
                </div>)}
        </div>
    );
}
