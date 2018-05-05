import { drizzleConnect } from 'drizzle-react'
import Home from './Home'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    ChannelManager: state.contracts.ChannelManager,
    accounts: state.accounts,
  }
}

const HomeContainer = drizzleConnect(Home, mapStateToProps)

export default HomeContainer