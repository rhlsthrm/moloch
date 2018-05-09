import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import proposalReducer from './proposalReducer'
import memberReducer from './memberReducer'

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  proposals: proposalReducer,
  members: memberReducer,
})

export default reducer
