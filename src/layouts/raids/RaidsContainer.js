import { drizzleConnect } from 'drizzle-react'
import Raids from './Raids'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
  }
}

const RaidsContainer = drizzleConnect(Raids, mapStateToProps)

export default RaidsContainer