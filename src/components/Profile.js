import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import Food from './Food';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            showModal: false,
            uid: '123',
            username: 'test',
            email: 'test@fake.com',
            name: 'test name',
            fav_rec: [1, 2, 3],
            fav_food: ['apple', 'orange', 'lemon']
        }
    }

    componentDidMount(){
        console.log(this.state)
    }

    handleShow(){
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }

    handleClose() {
        this.setState({showModal: false});
    }


    render() {
        return (
            <div>
                {/*Navbar at the top of all screens to navigate between pages */}
                <Navbar>
                    <Link to="/">
                        <p className="title">Food2Recipe</p>
                    </Link>
                    <button className="btn-profile">Profile</button>
                    <div className="logout">
                        <button className="btn-logout" /*onClick={this.logout}*/ >Logout</button>
                    </div>
                </Navbar>
                
                <div className="profile">
                    <div className="edit">
                        <button className="btn-edit" onClick={this.handleShow}>
                            <FontAwesomeIcon icon={faCog}/>
                        </button>
                    </div>
                    <p>Username: {this.state.username}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Name: {this.state.name}</p>
                </div>

                <div className="favFood"> 
                    <p className="favFoodTitle">Favorite Foods</p>
                    <Food name="orange"/>
                </div>

                <Modal show={this.showModal} onHide={this.handleClose} fade={false}>
                    <Modal.Header>Edit Profile</Modal.Header>
                </Modal>
            </div>
        );
    }
}

export default Profile;