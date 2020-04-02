import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Router } from 'react-router-dom';
import fire from './config/Fire';
import firebase from 'firebase';
import ForgotPW from './components/ForgotPW'




class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signup = this.signup.bind(this);
    
    this.state = {
      email: '',
      password: ''
    };
  }
  
  

  handleInputChange=(event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    console.log(this.state);
    const data = this.state;
    const  rules = {
      email: 'required|email' ,
      password: 'required|string|min:6|confirmed'
    }
    
    
  }
  
  
  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    fire.auth().signInWithPopup(provider);

  }
  signInWithFacebook = () => {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    
    fbprovider.setCustomParameters({
      'display': 'popup'
    });
    fire.auth().signInWithPopup(fbprovider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var fbuser = result.user;
      
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((errors) => {
        console.log(errors);
        alert(errors);
      });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((u)=>{
      console.log(u);
      return fire.database().ref('users/'+u.user.uid).set({
        username: u.user.email,
        email: u.user.email,
        name: u.user.email,
        hideEmail: false,
        hideName: false,
        fav_food: ["first element"],
        numFav_rec: 0,
        email_verified: false,
        
      }
      );
    })
    .catch((errors) => {
        console.log(errors); 
        
        alert(errors);
      })    
  }
  
  

  render() {
    
    return (
     <BrowserRouter>
      <div className="col-md-6">
        <form className="form-type-material" onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input  value={this.state.email} onChange={this.handleInputChange} type="email" name="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
            
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input  value={this.state.password} onChange={this.handleInputChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
            <button onClick={this.signInWithGoogle} class="googleBtn" type="button">
              Google
            </button>
            <button onClick={this.signInWithFacebook} class="facebookBtn" type="button">
              Facebook
            </button>
          <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
          <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success login-btn">Signup</button>
        </form>
        <a href="../ForgotPW">forgotPW?</a>
        
      </div>
      </BrowserRouter>
      
 
      
      
    );
  }
}
export default Login;

