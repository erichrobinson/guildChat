import React, { Component } from 'react';

import './messageInput.css';

class MessageInput extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  async sendMessage() {
    if(this.state.message) {
      fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: this.state.message,
          conversationId: this.props.conversationId,
          senderId: this.props.senderId,
          recepientId: this.props.recepientId
        })
      })
    }
    this.state.message = ''
  }

  render() {
    return (
      <div className="message-input-container">
        <input value={this.state.message} onChange={(e) => this.updateMessage(e)} placeholder='Enter a new message...' />
        <button onClick={() => this.sendMessage()}>Send</button>
      </div>
    );
  }
}

export default MessageInput;
