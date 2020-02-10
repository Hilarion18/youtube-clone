import React, { Component } from 'react';
// import HomeComponent from '../components/home/HomeComponent'
import AuthForm from '../views/auth/AuthForm'

class AuthRoute extends Component {
  render() {
    return (
      <div className="App">
        <AuthForm/>
      </div>
    );
  }
}

export default AuthRoute