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
                
                <div className="profile">
                    <p>Username: {this.state.username}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Name: {this.state.name}</p>
                </div>

            </div>
        );
    }
}

export default Profile;