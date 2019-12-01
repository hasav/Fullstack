import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = ({ store }) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        store.dispatch(
            createAnecdote(content)
        )
        store.dispatch(
            setNotification(`you added '${content}'`)
            )
        setTimeout(() => {
            store.dispatch(setNotification(null))
              }, 5000)
    }

    return (
        <div>
        <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote