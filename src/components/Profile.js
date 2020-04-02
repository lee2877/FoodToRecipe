import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Navigation from '../components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Food from './Food';
import fire from '../config/Fire';
import Form from 'react-bootstrap/Form';
import './Profile.css'
import Recipe from './Recipe';
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
            favRecipes: [],
            showModal: false,
        };
    }



    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        // this.setState({uid: userId});
        fire.database().ref('/users/' + this.props.user.uid).on('value', snapshot => {
            this.setState({
                name: snapshot.val().name,
                email: snapshot.val().email,
                username: snapshot.val().username,
                hideEmail: snapshot.val().hideEmail,
                hideName: snapshot.val().hideName,
                favRecipes: snapshot.val().fav_rec,
            });
        });


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
                    <div className="header-title">Profile Page</div>
                    <hr />
                    <div className="flex">
                        <div className="profile-label">Username: </div>
                        <div className="profile-content">{this.state.username}</div>
                    </div>
                    <hr />
                    <div className="flex">
                        <div className="profile-label">Email: </div>
                        <div className="profile-content">{this.state.email}</div>
                    </div>
                    <hr />
                    <div className="flex">
                        <div className="profile-label">Name: </div>
                        <div className="profile-content">{this.state.name}</div>
                    </div>
                </div>

                {/* Favorite Recipes        */}
                <div className="favrec">
                    
                </div>

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