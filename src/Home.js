import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './components/Profile';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar>
                        <p className="title">Food2Recipe</p>
                        <Link to="/profile">
                            <button type="button" class="btn-profile">Profile</button>
                        </Link>
                        <div className="logout">
                            <button className="btn-logout" onClick={this.logout} >Logout</button>
                        </div>
                    </Navbar>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );

    }

}

export default Home;

