import { drizzleConnect } from 'drizzle-react'
import CurrentProposal from './CurrentProposal'

const mapStateToProps = state => {
  return {
    Moloch: state.contracts.Moloch,
    currentProposalDetailsKey: state.proposals.currentProposalDetailsKey,
    currentProposalIndexKey: state.proposals.currentProposalIndexKey,
    fetching: state.proposals.fetching
  }
}

const CurrentProposalContainer = drizzleConnect(CurrentProposal, mapStateToProps)

export default CurrentProposalContainer