import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import AuthRoute from './routes/LoginAuth';

class App extends Component {
  componentDidMount() {
    this.authLogin()
  }

  isLogin = () => {
    
  }

  authLogin = () => {
    if (localStorage.getItem('token')) {
      this.renderApp()
    }
  }
  
  renderLogin() {
    return (
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="head-page">
            Welcome to Youtube Clone
          </div>
          <div className="head-page2">
            Widen your insight
          </div>
        </div>
        <hr/>
        <AuthRoute/>
      </div>
    )
  }

  logout = () => {
    localStorage.removeItem('token')
    window.location.reload();
    this.renderLogin()
  }

  renderApp() {
    return (
      <Router>
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="head-page">
              Welcome to Youtube Clone
            </div>
            <div className="head-page2">
              Widen your insight
            </div>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link to={'/'} className="nav-link"> Home </Link></li>
                <li className="nav-item"><a href="/#" className="nav-link" onClick={this.logout}>Logout</a></li>
                {/* <li className="nav-item"><Link to={'/auth'} className="nav-link">Logout</Link></li> */}
              </ul>
            </div>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/auth' component={AuthRoute} />
              <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    )
  }

  render() {
    return (
      <div>
        {
          localStorage.getItem('token')
          // ? this.renderLogin()
          // : this.renderApp()
          ? this.renderApp()
          : this.renderLogin()
        }
      </div>
    );
  }
}

export default App;
