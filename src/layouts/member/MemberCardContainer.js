import { drizzleConnect } from 'drizzle-react'
import MemberCard from './MemberCard'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
  }
}

const MemberCardContainer = drizzleConnect(MemberCard, mapStateToProps)

export default MemberCardContainer