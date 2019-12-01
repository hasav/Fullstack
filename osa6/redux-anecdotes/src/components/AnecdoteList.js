import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const votingAction = (anecdote) => {
        store.dispatch(voteAnecdote(anecdote.id))
        store.dispatch(setNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            store.dispatch(setNotification((null)))
          }, 5000)
    }
    return (
        <ul>
            {store.getState().anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => 
                            votingAction(anecdote)}>vote</button>
                    </div>
                </div>
                )}
        </ul>
    )
    
}

export default AnecdoteList