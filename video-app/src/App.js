import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import LoginAuth from './routes/LoginAuth';

class App extends Component {
  render() {
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
                <li className="nav-item"><Link to={'/auth'} className="nav-link">Login</Link></li>
              </ul>
            </div>
           </nav>
           <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/auth' component={LoginAuth} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
