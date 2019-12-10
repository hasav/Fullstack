import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes +1
      }
      const newState = state.map(anecdote => 
        anecdote.id !== id ? anecdote: votedAnecdote)
      return newState.sort((a, b) => (a.votes > b.votes) ? -1 : 1)

    case 'NEW_ANECDOTE':
      return [...state, action.data]
      
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    default:
      return state
  }
}

export const voteAnecdote = (id, anecdotes) => {
  return async dispatch => {
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    const votedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes +1
    }
    await anecdoteService.update(votedAnecdote, id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default anecdoteReducer