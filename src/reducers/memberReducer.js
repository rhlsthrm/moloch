const initialState = {
    memberKey: null,
    fetching: false,
    error: null,
}

const memberReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_MEMBER_KEY':
            return Object.assign({}, prevState, {
                fetching: true
            })
        case 'RECEIVED_MEMBER_KEY':
            return Object.assign({}, prevState, {
                fetching: false,
                memberKey: action.payload
            })
        case 'REQUEST_MEMBER_KEY_FAILURE':
            return Object.assign({}, prevState, {
                fetching: false,
                error: action.payload
            })
        default:
            return prevState
    }
}

export default memberReducer