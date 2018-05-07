import { drizzleConnect } from 'drizzle-react'
import Home from './Home'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
  }
}

const HomeContainer = drizzleConnect(Home, mapStateToProps)

export default HomeContainer