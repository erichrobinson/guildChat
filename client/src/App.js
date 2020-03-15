import React, { Component } from 'react';

import Users from './components/users';
import Conversations from './components/conversations';
import Messages from './components/messages';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      conversation: '',
      messages: '',
      recepient: ''
    };
  }

  setUser = user => {
    this.setState({ user })
  }

  setConversation = conversation => {
    this.setState({ conversation })
  }

  render() {
    const userSelected = this.state.user
    const conversationSelected = this.state.conversation
    let view

    if(!userSelected) {
      view = <Users setUser={this.setUser}/>
    } else if(!conversationSelected) {
      view = <Conversations user={this.state.user} setConversation={this.setConversation} />
    } else {
      view = <Messages conversation={this.state.conversation} user={this.state.user} />
    }

    return (
      <div>
        <header>
          <img alt='guild-logo' src='https://media-exp1.licdn.com/dms/image/C4D0BAQFgmcGSGKfX1A/company-logo_200_200/0?e=2159024400&v=beta&t=_2ZSrUzaSeHTg9nKbo9hFLPJFBSG4aygViexqma0QYc' />
        </header>
        {view}
      </div>
    );
  }
}

export default App;
