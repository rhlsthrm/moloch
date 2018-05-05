import React, { Component } from 'react'
import { Container, Message, Icon } from 'semantic-ui-react'

class MessageList extends Component {
  createMessage = (msg, index) => {
    return (
      <div key={index}>
        <Message
          icon
          positive={msg.sentiment === 'positive'}
          negative={msg.sentiment === 'negative'}
          info={msg.sentiment === 'info'}
        >
          <Icon className='close icon' />
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
