import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

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
    }
    render() {
        return (
            <div>
                <Navbar>
                    <Link to="/">
                        <p className="title">Food2Recipe</p>
                    </Link>
                    <button type="button" class="btn-profile">Profile</button>
                    <div className="logout">
                        <button className="btn-logout" /*onClick={this.logout}*/ >Logout</button>
                    </div>
                </Navbar>
                <p>Profile Page</p>

            </div>
        );
    }
}

export default Profile;