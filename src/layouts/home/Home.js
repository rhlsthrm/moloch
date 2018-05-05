import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

// layouts
import MessageList from '../messages/MessageList';

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
      messages: []
    }
  }

  componentDidMount = () => {

  }


  componentDidUpdate = (nextProps) => {
    const { messages } = this.state
    if (nextProps === this.props || !nextProps) {
      return
    }

    if (this.validateWeb3(nextProps.web3) && messages.length === 0) {
      // correct metamask, check drizzle 
      if (!nextProps.drizzleStatus.initialized) {
        const msg = {
          icon: 'bullhorn',
          sentiment: 'warning',
          title: 'Whoops, looks like an error occurred',
          content:
            'We seem to be having some drizzle issues, are you on the same network you deployed to and using the same artifacts?'
        }
        if (messages.indexOf(msg) === -1) {
          messages.push(msg)
        }
        this.setState({ messages })
        return
      }
    } else {
      return
    }
  }

  validateWeb3 = (web3) => {
    const { messages } = this.state
    if (!web3 || web3.status === '' || !web3.networkId) {
      return false
    }
    
    if (web3.status === 'failed') {
      console.log('No web3 detected')
      const msg = {
        icon: 'bullhorn',
        sentiment: 'warning',
        title: 'Oops! Looks like you dont have MetaMask installed',
        content: 'Download MetaMask at https://metamask.io'
      }
      if (messages.indexOf(msg) === -1) {
        messages.push(msg)
      }
      this.setState({ messages })
      return false
    } else if (web3.status === 'initialized' && web3.networkId) {
      // validate network IDs (ganache, truffle, rinkeby)
      if (web3.networkId !== 5777 && web3.networkId !== 4) {
        console.log('Connected to incorrect network. Network: ' + web3.networkId)
        const msg = {
          icon: 'bullhorn',
          sentiment: 'warning',
          title: "Looks like you're not on Rinkeby or Truffle!",
          content: 'Switch to the Rinkeby network (or use your local machine) so everything works.'
        }
        if (messages.indexOf(msg) === -1) {
          messages.push(msg)
        }
        this.setState({ messages })
        return false
      }
    } else {
      // no metamask errors, clear messages
      this.setState({ messages: [] })
      return true
    }
  }

  render() {
    return (
      <main className="container">
        <Container>
          <MessageList messages={this.state.messages} />
        </Container>
      </main>
    )
  }
}

export default Home
