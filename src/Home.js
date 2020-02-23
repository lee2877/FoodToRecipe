import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './components/Profile';
import ForgotPW from './components/ForgotPW';

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
            <div>
                <Navbar>
                    <Link to="/">
                        <p className="title">Food2Recipe</p>
                    </Link>
                    <Link to="/profile">
                        <button className={"btn","btn-profile"}>Profile</button>
                    </Link>
                    <div className="logout">
                        <button className="btn-logout" onClick={this.logout} >Logout</button>
                    </div>
                </Navbar>
                
                {/* 
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                    </Switch> */}
            </div>
            
        );

    }

}

export default Home;

