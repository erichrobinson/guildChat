import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

import Message from './message'
import MessageInput from './messageInput'

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  scrollToNewMessage() {
    window.scrollTo(0,document.body.scrollHeight)
  }

  componentDidMount() {
    fetch(`/api/messages/${this.props.conversation._id}`)
      .then(res => res.json())
      .then(messages => this.setState({ messages }))
    
    const socket = socketIOClient('http://localhost:5000')
    
    socket.on('newMessage', msg => {
      const currentMessages = this.state.messages
      currentMessages.push(msg)
      this.setState({ messages: currentMessages })
      this.scrollToNewMessage()
    })
  }

  render() {
    const { user1Id, user2Id } = this.props.conversation
    const recepientId = this.props.user._id === user1Id ? user2Id : user1Id
    return (
      <div>
        {this.state.messages.map((message, i) =>
          <Message key={i} message={message} sentByUser={message.senderId === this.props.user._id} />
        )}
        <MessageInput 
          senderId={this.props.user._id}
          recepientId={recepientId}
          conversationId={this.props.conversation._id}
        />
      </div>
    )
  }
}

export default Messages
