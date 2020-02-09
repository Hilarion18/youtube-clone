import React, { Component } from 'react';
// import HomeComponent from '../components/home/HomeComponent'
import AuthView from '../views/auth/LoginAuth'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <AuthView/>
      </div>
    );
  }
}

export default Home