import React, { Component } from 'react'
import { Container, Message, Icon } from 'semantic-ui-react'

class MessageList extends Component {
  state = {
    visible: true
  }

  handleDismiss = () => {
    this.setState({ visible: false })
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps || nextProps == this.props) {
      // no new props
      return
    } else {
      this.setState({ visible: true})
    }
  }

  createMessage = (msg, index) => {
    return (
      <div key={index}>
        <Message
          hidden={!this.state.visible}
          icon
          positive={msg.sentiment === 'positive'}
          negative={msg.sentiment === 'negative'}
          info={msg.sentiment === 'info'}
          onDismiss={this.handleDismiss}
        >
          <Icon className={msg.icon} />
          <Message.Content>
            <Message.Header content={msg.title} />
            <p>{msg.content}</p>
          </Message.Content>
        </Message>
      </div>
    )
  }

  render () {
    const { messages } = this.props
    return (
      <Container style={{ paddingTop: '1em' }}>
        {messages.map((msg, index) => {
          return this.createMessage(msg, index)
        })}
      </Container>
    )
  }
}

export default MessageList
