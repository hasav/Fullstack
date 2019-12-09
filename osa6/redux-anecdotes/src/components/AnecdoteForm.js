import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.setNotification(`you added '${newAnecdote.content}'`)
        setTimeout(() => {
            props.setNotification('')
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

export default connect(
    null,
    { createAnecdote, setNotification }
)(NewAnecdote)