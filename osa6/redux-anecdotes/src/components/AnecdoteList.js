import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().anecdotes
    const filter = store.getState().filter
    const anecdotesToShow = () => {
        if ( filter === '' ) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))

    }
    const votingAction = (anecdote) => {
        store.dispatch(voteAnecdote(anecdote.id))
        store.dispatch(setNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            store.dispatch(setNotification(('')))
          }, 5000)
    }
    return (
        <ul>
            {anecdotesToShow().map(anecdote =>
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