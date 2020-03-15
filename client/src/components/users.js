import React, { Component } from 'react';

import './users.css';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const setUser = this.props.setUser
    return (
      <div>
        <h2>Select a user to login as</h2>
        {this.state.users.map((user,i) => 
          <div className="user-card" key={i} onClick={() => setUser(user)}>{user.name}</div>
        )}
      </div>
    );
  }
}

export default Users;
