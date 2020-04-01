import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './components/Profile';
import ForgotPW from './components/ForgotPW';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';
import { ingredients } from './ingredients.js';
import MySelect from "./MySelect.js";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated()
class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    
        this.state = {
            recipes: [],
            foods: [],
            fav_foods: []
        }
    }
    
    handleChange = selected => {
        var i = 1;
        var ingr = [];
        
        this.setState({
            foods: selected.map(p => p.value),
            optionSelected: selected
        }, () =>
        this.getRecipes()
        );
    };
    

    getRecipes() {
        console.log("getRecipes was called");
        const apiurl = "https://api.edamam.com/search?app_id=00b4728c&app_key=ec8f1ca8da43b4304bbbe9e1052816e9"
        let req = apiurl + "&q=" + this.state.foods.toString();
        setTimeout(() => {
            fetch(req)
                .then(results => {
                    return results.json();
                }).then((data) => {
                    let recipes = data.hits.map((hit) => {
                        return (
                            <div key={hit.recipe.label}>
                                <Recipe title={hit.recipe.label} img={hit.recipe.image} />
                            </div>
                        )
                    })
                    this.setState({ recipes: recipes });
                })
        })


    }

    componentDidMount() {
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        const {foods} = this.state;
        return (
            <div>
                <Navigation />
                <button
                    onClick={() => {
                        this.setState({
                            foods: [],
                            optionSelected: []
                        }, () =>
                            this.getRecipes()
                        );
                    }}
                >
                    {"Clear"}
                </button>
                <p>Select ingredients:</p>
                <MySelect
                    options={ingredients}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={animatedComponents}
                    onChange={this.handleChange}
                    value={this.state.optionSelected}
                />
                
                
                
                <div className="recipe-list">
                    {/* <Recipe title="Asparagus" img="https://hips.hearstapps.com/del.h-cdn.co/assets/18/09/1519653347-delish-roasted-asparagus-1.jpg?crop=0.865xw:0.865xh;0.0590xw,0.0755xh&resize=480:*" />
                    <Recipe title="Chicken Parm" calories="250" img="https://cafedelites.com/wp-content/uploads/2018/04/Chicken-Parmigiana-IMAGE-2.jpg" />
                    <Recipe title="Asparagus" img="https://hips.hearstapps.com/del.h-cdn.co/assets/18/09/1519653347-delish-roasted-asparagus-1.jpg?crop=0.865xw:0.865xh;0.0590xw,0.0755xh&resize=480:*" />
                    <Recipe title="Asparagus" img="https://hips.hearstapps.com/del.h-cdn.co/assets/18/09/1519653347-delish-roasted-asparagus-1.jpg?crop=0.865xw:0.865xh;0.0590xw,0.0755xh&resize=480:*" /> */}

                    {this.state.recipes}
                </div>
            </div>

        );

    }

}


export default Home;

