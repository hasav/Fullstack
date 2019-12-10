import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const votingAction = (anecdote, visibleAnecdotes) => {
        props.voteAnecdote(anecdote.id, visibleAnecdotes)
        props.setNotification(`you voted '${anecdote.content}'`, 10)
    }
    return (
        <ul>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => 
                            votingAction(anecdote, props.visibleAnecdotes)}>vote</button>
                    </div>
                </div>
                )}
        </ul>
    )
    
}

const anecdotesToShow = ( { anecdotes, filter }) => {
    if ( filter === '' ) {
        return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))

}

const mapStateToProps = (state) => {
    return {
    visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAnecdote: voteAnecdote,
    setNotification: setNotification
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)