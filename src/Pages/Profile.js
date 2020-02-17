import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import fire from '../config/Fire';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '123',
            username: 'test',
            email: 'test@fake.com',
            name: 'test name',
            fav_rec: [1, 2, 3],
            fav_food: ['apple', 'orange', 'lemon']
        }
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
                        <button className="title">Food2Recipe</button>
                    </Link>
                    <button type="button" class="btn-profile">Profile</button>
                    <div className="logout">
                        <button className="btn-logout" onClick={this.logout} >Logout</button>
                    </div>
                </Navbar>
                <p>Profile Page</p>
            </div>
        );
    }

}