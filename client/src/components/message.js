import React, { Component } from 'react';
import './message.css';

class Message extends Component {
  render() {
    const classname = this.props.sentByUser ?  'sent' : 'received'
    const userName = this.props.sentByUser ? 'You' : this.props.message.senderName
    return (
      <div className='message-wrapper'>
        <div className={`message-container ${classname}`}>
          <div className={`message ${classname}`}>
            {this.props.message.text}
            <div className={`label ${classname}`}>{userName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
