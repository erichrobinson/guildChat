import React, { Component } from 'react';

import './conversations.css';

class Conversations extends Component {
  constructor() {
    super();
    this.state = {
      conversations: []
    }
  }

  componentDidMount() {
    fetch(`/api/conversations/${this.props.user._id}`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  }

  render() {
    const setConversation = this.props.setConversation
    return (
      <div>
        <h2>Select a conversation to join</h2>
        {this.state.conversations.map((convo, i) => 
          <div className='conversation-card' onClick={() => setConversation(convo)} key={i}>Conversation: {convo._id}</div>
        )}
      </div>
    );
  }
}

export default Conversations;
