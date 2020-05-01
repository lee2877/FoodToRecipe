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
import { withRouter } from 'react-router';
// import {withAuth} from './withAuth';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.toggleHide = this.toggleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: '',
            username: '',
            email: '',
            name: '',
            hideName: false,
            hideEmail: false,
            profileFavRecipes: [],
            userFavRecipes: [],
            userLikedRecipes: [],
            showModal: false,
            recipes: [],
        };
    }

    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        var user = fire.auth().currentUser;
        this.setState({
            user: user
        })
        /* Get info about the desired user */
        this.getProfileInfo();

        /*Fetch the info of the current user    */
        var userRef = fire.database().ref('/users/' + user.uid);
        userRef.child('fav_rec').on('value', snapshot => {
            if (snapshot.exists()) {
                var returnArr = [];
                snapshot.forEach(function (childSnapshot) {
                    var item = childSnapshot.val();
                    returnArr.push(item);
                });
                this.setState({
                    userFavRecipes: returnArr,
                })
            }
        });
        userRef.child('liked_rec').on('value', snapshot => {
            if (snapshot.exists()) {
                var returnArr = [];
                snapshot.forEach(function (childSnapshot) {
                    var item = childSnapshot.val();
                    returnArr.push(item);
                });
                this.setState({
                    userLikedRecipes: returnArr,
                })
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.profileFavRecipes !== this.state.profileFavRecipes) {
            let recipes = this.state.profileFavRecipes.map((hit) => {
                return (
                    <div key={hit.title}>
                        <Recipe
                            recipe={hit.title}
                            uri={hit.uri}
                            img={hit.img}
                            url={hit.url}
                            favRecipes={this.state.userFavRecipes}
                            likedRecipes={this.state.userLikedRecipes}
                        />
                    </div>
                )
            })
            this.setState({ recipes: recipes });
        }
        if (prevProps.match.params !== this.props.match.params) {
            this.getProfileInfo();
        }
    }

    getProfileInfo(){
        /*Fetch the info for the profile page of the requested user*/
        var profileRef = fire.database().ref('/users/' + this.props.match.params.user)
        profileRef.on('value', snapshot => {
            this.setState({
                name: snapshot.val().name,
                email: snapshot.val().email,
                username: snapshot.val().username,
                hideEmail: snapshot.val().hideEmail,
                hideName: snapshot.val().hideName,
            });
        });
        profileRef.child('fav_rec').on('value', snapshot => {
            if (snapshot.exists()) {
                var returnArr = [];
                snapshot.forEach(function (childSnapshot) {
                    var item = childSnapshot.val();
                    returnArr.push(item);
                });
                this.setState({
                    profileFavRecipes: returnArr,
                })
            }
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
            .update({
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

    sendEmailVerify(event) {
        var user = fire.auth().currentUser;
        if (user.emailVerified === false) {

            user.sendEmailVerification().then(function () {
                // Email sent.
                alert("Verification Sent!");
            }).catch(function (error) {
                // An error happened.
            });
        } else {
            alert("Already Verified!");
        }

    }

    deleteUserAccount(event) {
        var user = fire.auth().currentUser;
        user.delete()
            .then(function () {
                alert("Successfully Deleted Your Account!");
                console.log('Successfully deleted user');
            })
            .catch(function (error) {
                alert("Error occured")
                console.log('Error deleting user:', error);
            });
    }


    render() {
        var user = fire.auth().currentUser;

        return (
            <div>
                {/*Navbar at the top of all screens to navigate between pages */}
                <Navigation />

                <div className="profile">
                    {(this.props.match.params.user === user.uid)
                    ?<div className="edit">
                        <button className="btn-edit" onClick={this.handleShow}>
                            <FontAwesomeIcon icon={faCog} />
                        </button>
                    </div>
                    :<div/>}
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
                    <hr />
                    <div className="flex">
                        <div className="profile-label">Verified: </div>
                        <div className="profile-content">{this.state.user.emailVerified}</div>

                    </div>
                    <div>
                        <button class="btn btn-success" id="sendVerification" onClick={this.sendEmailVerify}>Send Verification</button>
                    </div>
                    <hr />
                    <div>

                        <button class="btn btn-danger" id="deleteAccount" onClick={this.deleteUserAccount}>Delete Account</button>

                    </div>
                </div>

                {/* Favorite Recipes        */}
                <div className="fav">
                    <h1 className="favorite-title">Favorite Recipes</h1>
                    <div className="favrec-list">
                        {this.state.recipes}
                    </div>
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

const ProfileWithRouter = withRouter(Profile);

// const condition = user => !!user;

// export default withAuth(condition)(Profile);