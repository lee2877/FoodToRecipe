import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import fire from '../config/Fire';

class ForgotPW extends Component {

    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pwMail=this.pwMail.bind(this);
        this.state={
            mail: ''
        };
    }

    handleInputChange=(e)=>{
        this.setState({ [e.target.name]:e.target.value })
    }

    pwMail(e){
      
        fire.auth().sendPasswordResetEmail(this.state.mail)
        
    }

   
    render(){
       
        return(
            <div class="sendMailClass">           
            <p>
              <input value={this.state.mail} onChange={this.handleInputChange}
                                             type="mail" name="mail" placeholder="Enter your Email"></input>
            </p> 

            <button type="submit" onClick={this.pwMail} class="btn btn-primary">Send Email Mother Fucker</button>
            
            </div>
        );
    }
}

export default ForgotPW;