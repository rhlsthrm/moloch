import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import proposalReducer from './proposalReducer'

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  proposals: proposalReducer
})

export default reducer
