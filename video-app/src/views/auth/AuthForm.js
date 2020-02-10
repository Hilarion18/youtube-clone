import React, { Component } from 'react';
import axios from 'axios'
import config from '../../config.js'
import './style/LoginStyle.css'

class LoginAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFormClick: true,
      isTyping: false,
      isClickedLog: {
        color: "#029f5b",
        fontSize: "18px"
      },
      loginActive: "active",
      signUpActive: "",
      username: "",
      password: ""
    };
    this.nameChange = this.nameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  nameChange = (event) => {
    const target = event.target
    const value = target.type === 'name' ? target.checked : target.value;
    this.setState({
      username: value
    })
  }

  passwordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  toLogin = () => {
    this.setState({
      onFormClick: true,
      loginActive: "active",
      signUpActive: ""
    })
  }

  toSignUp = () => {
    this.setState({
      onFormClick: false,
      loginActive: "",
      signUpActive: "active"
    })
  }

  signUp = () => {
    axios({
      method: 'POST',
      url: `${config.port}/register`,
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then((res) => {
        localStorage.setItem(`token`, res.data.data)
        // window.location.reload();
      })
      .catch((err) => {
        alert(err.message)
      })

  }

  login = () => {
    axios({
      method: 'POST',
      url: `${config.port}/login`,
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then((res) => {
        localStorage.setItem(`token`, res.data.data)
        window.location.reload();
      })
      .catch((err) => {
        console.log(`err`, err)
        alert(err.message)
      })

  }

  renderSignUp() {
    return (
      <form className="signup">
        <div className="u-form-group">
          <input
            value={this.state.username}
            onChange={this.nameChange} 
            type="name" 
            placeholder="Name"
          />
        </div>
        <div className="u-form-group">
          <input
            value={this.state.password}
            onChange={this.passwordChange} 
            type="password" 
            placeholder="Password"
          />
        </div>
        <div className="u-form-group">
          <button onClick={this.signUp}>Sign Up</button>
        </div>
      </form>
    )
  }

  renderLogin() {
    return (
      <form className="login">
        <div className="u-form-group">
          <input 
            value={this.state.username}
            onChange={this.nameChange} 
            type="name" 
            placeholder="Name"
          />
        </div>
        <div className="u-form-group">
          <input 
            value={this.state.password}
            onChange={this.passwordChange} 
            type="password" 
            placeholder="Password"
          />
        </div>
        <div className="u-form-group">
          <button onClick={this.login}>Log in</button>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          <div className="lb-header">
            <a href="/#" className={this.state.loginActive} id="login-box-link" onClick={this.toLogin} >Login</a>
            {/* <a href="/#" className={this.state.signUpActive} id="signup-box-link" onClick={this.toSignUp} >Sign Up</a> */}
          </div>
          {
            this.state.onFormClick
            ? this.renderLogin()
            : this.renderSignUp()
          }
        </div>
      </div>
    );
  }
}

export default LoginAuth
