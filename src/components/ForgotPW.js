import React, { Component } from 'react';

class ForgotPW extends Component {
    render(){

        return(
            <article>

                <h2>Forgot Passwords?</h2>
                <form action ="/forgot_pw" method="findPW"
                    onSubmit={function(e){
                        e.preventDefault();
                        this.props.onSubmit(
                            e.target.email.value
                        );
                    }.bind(this)}
                >
                    <p>
                        <input type="text" name="email" placeholder="Enter mail address"></input>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                        
                </form>
            </article>
        );
    }
}

export default ForgotPW;