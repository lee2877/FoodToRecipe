import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './components/Profile';
import ForgotPW from './components/ForgotPW';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getRecipes = this.getRecipes.bind(this);

        this.state = {

        }
    }

    getRecipes(){
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch("https://api.edamam.com/search/app_id=00b4728c&app_key=ec8f1ca8da43b4304bbbe9e1052816e&q=chicken")
        .then((data) => data.json())
        .then((response) => {
            console.log(response);
        })
    }

    componentDidMount(){
        this.getRecipes();
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <Navigation />
                <Recipe title="Chicken Parm" calories="250" img="https://cafedelites.com/wp-content/uploads/2018/04/Chicken-Parmigiana-IMAGE-2.jpg"/>
            </div>

        );

    }

}

export default Home;

