import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    return (
        <ul>
            {store.getState().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => 
                            store.dispatch(voteAnecdote(anecdote.id))}>vote</button>
                    </div>
                </div>
                )}
        </ul>
    )
    
}

export default AnecdoteList