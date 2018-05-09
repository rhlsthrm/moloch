import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Loader,
  Grid
 } from 'semantic-ui-react'

// layouts
import MessageList from '../messages/MessageList';
import CurrentProposalContainer from '../proposals/CurrentProposalContainer';

// actions
import { getCurrentProposalIndexKey, getCurrentProposalDetailsKey } from '../../actions/index.js'

class Home extends Component {
  static contextTypes = {
    drizzle: PropTypes.object.isRequired,
    drizzleStore: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props)

    this.props = props
    this.context = context
    this.contracts = context.drizzle.contracts
    // init state
    this.state = {
      errors: [],
      loadingTxs: [],
      contractInit: false,
    }
  }

  validateWeb3 = (web3) => {
    if (!web3 || web3.status === '' || !web3.networkId) {
      return false
    }
    
    if (web3.status === 'failed') {
      console.log('No web3 detected')
      let errors = []
      errors.push({
        icon: 'bullhorn',
        sentiment: 'warning',
        title: 'Oops! Looks like you dont have MetaMask installed',
        content: 'Download MetaMask at https://metamask.io'
      })
      this.setState({ errors })
      return false
    } else if (web3.status === 'initialized' && web3.networkId) {
      // validate network IDs (ganache, truffle, rinkeby)
      if (web3.networkId !== 5777 && web3.networkId !== 4) {
        console.log('Connected to incorrect network. Network: ' + web3.networkId)
        let errors= []
        errors.push({
          icon: 'bullhorn',
          sentiment: 'warning',
          title: "Looks like you're not on Rinkeby or Truffle!",
          content: 'Switch to the Rinkeby network (or use your local machine) so everything works.'
        })
        this.setState({ errors })
        return false
      }
      // no metamask errors, clear messages
      this.setState({ errors: [] })
      return true
    } 
  }

  getLoadingTransactions = () => {
    let loadingTxs
    if (this.props.transactionStack && this.props.transactions) {
      loadingTxs = this.props.transactionStack.map(txId => {
        if (this.props.transactions[txId].status === 'pending') {
          const txInfo = {
            icon: 'notched circle loading icon',
            sentiment: 'warning',
            title: 'Tx Being Mined',
            content: `${txId} is being mined.`
          }
          return txInfo
        } else {
          return null
        }
      })
    }

    return loadingTxs.filter(tx => tx !== null)
  }

  getErrorTransactions = () => {
    const { transactionStack, transactions } = this.props
    let errorTxs
    if (transactionStack && transactions) {
      errorTxs = transactionStack.map(txId => {
        if (transactions[txId].status === 'error') {
          const txInfo = {
            icon: 'tiny bullhorn',
            sentiment: 'negative',
            title: 'Transaction Error!',
            content: `${txId} did not go through.`
          }
          return txInfo
        } else {
          return null
        }
      })
    }
    return errorTxs.filter(tx => tx !== null)
  }

  getCurrentProposalKeys = () => {
    const { dispatch } = this.props
    dispatch(getCurrentProposalIndexKey(this.contracts.Moloch))
    dispatch(getCurrentProposalDetailsKey(this.contracts.Moloch))
  }


  componentWillReceiveProps = (nextProps) => {
    const { errors } = this.state
    if (nextProps === this.props || !nextProps) {
      // no new props
      return
    }

    if (
      this.validateWeb3(nextProps.web3) && 
      errors.length === 0
    ) {
      // no metamask errs
      if (
        nextProps.drizzleStatus.initialized && 
        nextProps.Moloch.initialized && 
        !this.state.contractInit &&
        // nextProps.proposals.currentProposalDetailsKey === null &&
        nextProps.proposals.currentProposalIndexKey === null
      ) {
        // drizzle and contract inited, set state vars
        console.log('Properly Initd')
        this.setState({ contractInit: true})

        // get current proposal info
        this.getCurrentProposalKeys()

        // get tx msgs (loading and errors)
        // everything is initialized, get txmsgs
        this.props.transactionStack.forEach(txId => {
          if (
            this.props.transactions[txId] &&
            this.props.transactions[txId].status !==
              nextProps.transactions[txId].status
          ) {
            // TO DO:
            // tx status has changed in props, refresh relevant info in home or state
            return
          }
        })
        return
      }
    }
  }

  render () {
    const { drizzleStatus, Moloch } = this.props
    const { errors } = this.state
    
    // get tx msgs
    let loadingTxs, errorTxs
    if (drizzleStatus.initialized && Moloch.initialized && errors.length === 0) {
      loadingTxs = this.getLoadingTransactions()
      errorTxs = this.getErrorTransactions()
    }
    // combine tx message lists
    let txMsgs = []
    if (loadingTxs && loadingTxs.length !== 0 ) {
      txMsgs = txMsgs.concat(loadingTxs)
    }
    if (errorTxs && errorTxs.length !== 0) {
      txMsgs = txMsgs.concat(errorTxs)
    }


    return (
      <main className="container">
        <MessageList messages={errors} />

        <MessageList messages={txMsgs} />

        <Loader active={!Moloch.initialized} />

        <Grid>
        <Grid.Row>

            <CurrentProposalContainer />

          </Grid.Row>

        </Grid>
      </main>
    )
  }
}

export default Home
