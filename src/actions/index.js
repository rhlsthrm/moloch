/** CURRENT PROPOSAL ACTIONS */
function requestCurrentProposalIndexKey () {
    return {
        type: 'REQUEST_CURRENT_PROPOSAL_INDEX'
    }
}

function receiveCurrentProposalIndexKey (dataKey) {
    return {
        type: 'RECEIVED_CURRENT_PROPOSAL_INDEX',
        payload: dataKey
    }
}

function requestCurrentProposalIndexKeyFailure (e) {
    return {
        type: 'REQUEST_CURRENT_PROPOSAL_INDEX_FAILURE',
        payload: e.toString()
    }
}

function requestCurrentProposalDetailsKey () {
    return {
        type: 'REQUEST_CURRENT_PROPOSAL_DETAILS'
    }
}

function receiveCurrentProposalDetailsKey (dataKey) {
    return {
        type: 'RECEIVED_CURRENT_PROPOSAL_DETAILS',
        payload: dataKey
    }
}

function requestCurrentProposalDetailsKeyFailure (e) {
    return {
        type: 'REQUEST_CURRENT_PROPOSAL_DETAILS_FAILURE',
        payload: e.toString()
    }
}

// this way you can handle async/await with dispatch:
export const getCurrentProposalIndexKey = (Moloch) => {
    return dispatch => {
        dispatch(requestCurrentProposalIndexKey)
        try {
            const key = Moloch.methods.getCurrentProposalIndex.cacheCall() // get index (contract fn)
            dispatch(receiveCurrentProposalIndexKey(key))
        } catch (e) {
            dispatch(requestCurrentProposalIndexKeyFailure(e))
        }
    }
}

// this way you can handle async/await with dispatch:
export const getCurrentProposalDetailsKey = (Moloch) => {
    return dispatch => {
        dispatch(requestCurrentProposalDetailsKey)
        try {
            const key = Moloch.methods.getCurrentProposalCommonDetails.cacheCall() // get index (contract fn)
            dispatch(receiveCurrentProposalDetailsKey(key))
        } catch (e) {
            dispatch(requestCurrentProposalDetailsKeyFailure(e))
        }
    }
}



/** GET MEMBER ACTIONS */
function requestMemberKey () {
    return {
        type: 'REQUEST_MEMBER_KEY'
    }
}

function receiveMemberKey (dataKey) {
    return {
        type: 'RECEIVED_MEMBER_KEY',
        payload: dataKey
    }
}

function requestMemberKeyFailure (e) {
    return {
        type: 'REQUEST_MEMBER_KEY_FAILURE',
        payload: e.toString()
    }
}

export const getMemberKey = (address, Moloch) => {
    return dispatch => {
        dispatch(requestMemberKey)
        try {
            const dataKey = Moloch.methods.getMember.cacheCall(address)
            dispatch(receiveMemberKey(dataKey))
        } catch (e) {
            dispatch(requestMemberKeyFailure(e))
        }
    }
}

function requestVotingSharesKey () {
    return {
        type: 'REQUEST_VOTING_SHARES_KEY'
    }
}

function receiveVotingSharesKey (dataKey) {
    return {
        type: 'RECEIVED_VOTING_SHARES_KEY',
        payload: dataKey
    }
}

function requestVotingSharesKeyFailure (e) {
    return {
        type: 'REQUEST_VOTING_SHARES_KEY_FAILURE',
        payload: e.toString()
    }
}

export const getVotingSharesKey = (address, Moloch) => {
    return dispatch => {
        dispatch(requestVotingSharesKey)
        try {
            const dataKey = Moloch.methods.getVotingShares.cacheCall(address)
            dispatch(receiveVotingSharesKey(dataKey))
        } catch (e) {
            dispatch(requestVotingSharesKeyFailure(e))
        }
    }
}