import { drizzleConnect } from 'drizzle-react'
import MemberGrid from './MemberGrid'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
  }
}

const MemberGridContainer = drizzleConnect(MemberGrid, mapStateToProps)

export default MemberGridContainer