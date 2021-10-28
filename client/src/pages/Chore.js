import React from 'react';
import { useQuery } from '@apollo/client'

import { QUERY_CHORE } from '../utils/queries'

import ChoreCard from '../components/ChoreCard'

export default function Chore() {
    const { loading, data } = useQuery(QUERY_CHORE)
    const chores = data?.chore || []

    console.log(chores)
    return (
        <div>
            <h1 className="my-5">Chores</h1>
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
