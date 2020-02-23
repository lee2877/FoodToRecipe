import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Router } from 'react-router-dom';
import fire from './config/Fire';
import ForgotPW from './components/ForgotPW'
import { validateAll } from 'indicative';

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
    const messages = {
      required: ' This {{ field }} is required.',
      'email.email': 'The email is invalid.'
    }
    
    validateAll(data, rules, messages )
      .then(() => {
        console.log('success')
      })
      .catch(errors => {
        console.log(errors);
        const formattedErrors = {}
        errors.forEach( error => formattedErrors[error.field] = error.message )
        this.setState({ errors: formattedErrors })
      }) 
  }
  

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
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
          <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
          <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
        </form>
        <a href="../ForgotPW">forgotPW?</a>
        
      </div>
      </BrowserRouter>
      
 
      
      
    );
  }
}
export default Login;

