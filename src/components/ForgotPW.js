import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import fire from '../config/Fire';

class ForgotPW extends Component {

  

   
    render(){

        return(
            <div>
            <form action="/create_process" method="post"
            onSubmit={function(e){
                e.preventDefault();
                this.props.onSubmit(
                  e.target.title.value,
                  
                );
                
            }.bind(this)}
          >
            <p>
              <input type="text" name="title" placeholder="Enter your Email"></input>
            </p>
            
            <button type="submit" onClick={fire.p} class="btn btn-primary">Send Email</button>
          </form>
        
            </div>
        );
    }
}

export default ForgotPW;