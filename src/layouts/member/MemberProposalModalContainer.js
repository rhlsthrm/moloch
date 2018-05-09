import { drizzleConnect } from 'drizzle-react'
import MemberProposalModal from './MemberProposalModal'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
  }
}

const MemberProposalModalContainer = drizzleConnect(MemberProposalModal, mapStateToProps)

export default MemberProposalModalContainer