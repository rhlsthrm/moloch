const initialState = {
  currentProposalDetailsKey: null,
  currentProposalIndexKey: null,
  fetching: false,
  error: null,
}

const proposalReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CURRENT_PROPOSAL_INDEX':
      return Object.assign({}, prevState, {
        fetching: true
      })
    case 'RECEIVED_CURRENT_PROPOSAL_INDEX':
      return Object.assign({}, prevState, {
        fetching: false,
        currentProposalIndexKey: action.payload
      })
    case 'REQUEST_CURRENT_PROPOSAL_INDEX_FAILURE':
      return Object.assign({}, prevState, {
        fetching: false,
        error: action.payload
      })
    case 'REQUEST_CURRENT_PROPOSAL_DETAILS':
      return Object.assign({}, prevState, {
        fetching: true
      })
    case 'RECEIVED_CURRENT_PROPOSAL_DETAILS':
      return Object.assign({}, prevState, {
        fetching: false,
        currentProposalDetailsKey: action.payload
      })
    case 'REQUEST_CURRENT_PROPOSAL_DETAILS_FAILURE':
      return Object.assign({}, prevState, {
        fetching: false,
        error: action.payload
      })
    default:
      return prevState
  }
}

export default proposalReducer