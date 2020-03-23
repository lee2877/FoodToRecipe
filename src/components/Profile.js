import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Navigation from '../components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Food from './Food';
import fire from '../config/Fire';
import Form from 'react-bootstrap/Form';
import './Profile.css'
// import {withAuth} from './withAuth';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.toggleHide = this.toggleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            email: '',
            name: '',
            hideName: false,
            hideEmail: false,
            fav_rec: [1, 2, 3],
            fav_food: ['apple', 'orange', 'lemon'],
            showModal: false,
        };
    }



    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        var userId = this.props.user.uid;
        var getName;
        // this.setState({uid: userId});
        fire.database().ref('/users/' + this.props.user.uid).on('value', snapshot => {
            this.setState({
                name: snapshot.val().name,
                email: snapshot.val().email,
                username: snapshot.val().username,
                hideEmail: snapshot.val().hideEmail,
                hideName: snapshot.val().hideName
            });
            // getName = snapshot.val().name;
        });
        //   this.setState({name: getName})
        // console.log(fire.database().ref('/users/' + userId).once('value').then(funciton(snapshot)))
    }

    setName(name) {
        this.setState({ name: name })
    }

    handleShow() {
        this.setState({ showModal: true });
    }
    handleClose() {
        this.setState({ showModal: false });
    }

    handleSubmit(event) {
        fire.database().ref('/users/' + this.props.user.uid)
            .set({
                username: this.state.username,
                email: this.state.email,
                name: this.state.name,
                hideName: this.state.hideName,
                hideEmail: this.state.hideEmail,
            });
        this.handleClose();

        event.preventDefault();
    }

    handleTextChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    toggleHide(event) {
        this.setState({ [event.target.id]: event.target.checked });
    }


    render() {
        return (
            <div>
                {/*Navbar at the top of all screens to navigate between pages */}
                <Navigation />

                <div className="profile">
                    <div className="edit">
                        <button className="btn-edit" onClick={this.handleShow}>
                            <FontAwesomeIcon icon={faCog} />
                        </button>
                    </div>
                    <p className="header-title">Profile Page</p>
                    <p>Username: {this.state.username}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Name: {this.state.name}</p>
                </div>
                {/* 
                <div className="favFood">
                    <p className="header-title">Favorite Foods</p>
                    <Food name="orange" />
                </div> */}

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header className="header-title">Edit Profile</Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Editing username */}
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter your username here"
                                />
                            </Form.Group>

                            {/* Editing email */}
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter your email here"
                                />
                                <Form.Check
                                    type="switch"
                                    checked={this.state.hideEmail}
                                    label="Hide Email"
                                    id="hideEmail"
                                    onChange={this.toggleHide}
                                />
                            </Form.Group>
                            {/* Editing name */}
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter your name here"
                                />
                                <Form.Check
                                    type="switch"
                                    checked={this.state.hideName}
                                    label="Hide Name"
                                    id="hideName"
                                    onChange={this.toggleHide}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="cancel-btn" onClick={this.handleClose}>Cancel</button>
                        <button className="save-btn" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Profile;

// const condition = user => !!user;

// export default withAuth(condition)(Profile);