import React, { Component } from 'react';
import fire from './config/fire';
import { render } from 'react-dom';
import { HotModuleReplacementPlugin } from 'webpack';

class Home extends Component{
    constructor(props){
        super(props);
    }


    

    render(){
        return (
            <div className="col-md-6">
            <h1>you are home</h1>
            </div>
        );
    }
}
export default Home;