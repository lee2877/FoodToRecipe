import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { browserHistory } from 'react-router';
import fire from '../config/Fire';
import './ForgotPW.css';



class ForgotPW extends Component {

    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pwMail=this.pwMail.bind(this);
        this.handleGoBack=this.handleGoBack.bind(this);
        this.state={
            mail: ''
        };
    }


    handleGoBack =()=>{
        this.props.history.goBack();
    }
    

    handleInputChange=(e)=>{
        this.setState({ [e.target.name]:e.target.value })
    }

    pwMail(e){
      
        fire.auth().sendPasswordResetEmail(this.state.mail).then((u)=>{
        }).then((u)=>{console.log(u)})
        .catch((errors)=>{
            console.log(errors);
            alert(errors);
        })
        this.handleGoBack();
    }

   
    render(){
       
        return(
            
            <div>
                <div class = "header">
                    Find Password
                </div>
                <div class ="findText">
                   Enter your email and click the Request button
                </div>
                <div class="ForgotPW">          
                    <p>
                    <input value={this.state.mail} onChange={this.handleInputChange}
                                                    type="mail" name="mail" placeholder="Enter your Email"></input>
                    </p> 
                    <button className="Btn" type="submit" onClick={this.pwMail} >Send Request</button>
                </div> 
                
                    
                   
            </div>
        );
    }
}

export default withRouter(ForgotPW);