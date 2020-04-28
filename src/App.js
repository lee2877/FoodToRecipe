import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import fire from './config/Fire.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './components/Profile';
import ForgotPW from './components/ForgotPW';
import Ranking from './components/Ranking';



class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>

            <Route exact path="/profile">
              <div>
                {this.state.user ? (
                  <Profile user={this.state.user} />
                ) :
                  (
                    <Login />

                  )}
              </div>
            </Route>
            <Route exact path="/Ranking" component={Ranking}>
            </Route>
            <Route exact path="/ForgotPW" component={ForgotPW}>
            </Route>
            <Route exact path="/Login">
            </Route>
            <Route path="/">
              <div>
                {this.state.user ? (
                  <Home />
                ) :
                  (
                    <Login />

                  )}
              </div>
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
