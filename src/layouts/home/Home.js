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
      messages: [
        {
          icon: 'bullhorn',
          sentiment: 'warning',
          title: 'Whoops, looks like an error occurred',
          content:
            'We seem to be having some drizzle issues, are you on the same network you deployed to and using the same artifacts?'
        }
      ],
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
