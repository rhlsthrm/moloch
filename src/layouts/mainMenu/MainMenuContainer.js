import { drizzleConnect } from 'drizzle-react'
import MainMenu from './MainMenu'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Moloch: state.contracts.Moloch,
    accounts: state.accounts,
    history: state.history,
    match: state.match
  }
}

const MainMenuContainer = drizzleConnect(MainMenu, mapStateToProps)

export default MainMenuContainer