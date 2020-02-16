import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container'

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
                    <p className="title">Food2Recipe</p>
                    <button type="button" class="btn-profile">Profile</button>
                    <div className="logout">
                        <button className="btn-logout" onClick={this.logout} >Logout</button>
                    </div>
                </Navbar>
            </div>
        );

    }

}

export default Home;

