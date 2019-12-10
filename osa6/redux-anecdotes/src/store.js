import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store