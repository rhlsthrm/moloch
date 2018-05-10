import { drizzleConnect } from 'drizzle-react'
import RaidProposalModal from './RaidProposalModal'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
  }
}

const RaidProposalModalContainer = drizzleConnect(RaidProposalModal, mapStateToProps)

export default RaidProposalModalContainer