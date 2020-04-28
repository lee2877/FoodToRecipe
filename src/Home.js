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
import Notifications from "./components/Notifications";
import Ranking from './components/Ranking';
//import { BrowserRouter} from 'react-router-dom';

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
            likes: 0,
            favRecipes: [],
            likedRecipes: [],
        }
    }
    
    handleChange = selected => {
        var i = 1;
        var ingr = [];
        
        this.setState({
            foods: selected.map(p => p.value),
            optionSelected: selected
        }
        );
    };
    

    getRecipes() {
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
                                <Recipe
                                    recipe={hit.recipe.label}
                                    uri={hit.recipe.uri}
                                    img={hit.recipe.image}
                                    url={hit.recipe.url}
                                    favRecipes={this.state.favRecipes}
                                    likedRecipes={this.state.likedRecipes}
                                />
                            </div>
                        )
                    })
                    this.setState({ recipes: recipes });
                })
        })
    }

    componentDidMount() {
        fire.database().ref('/users/' + fire.auth().currentUser.uid).child('fav_rec').on('value', snapshot => {
            if (snapshot.exists()) {
                var returnArr = [];
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    returnArr.push(item);
                });
                this.setState({
                    favRecipes: returnArr,
                })
            }
        });
        fire.database().ref('/users/' + fire.auth().currentUser.uid).child('liked_rec').on('value', snapshot => {
            if (snapshot.exists()) {
                var returnArr = [];
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    returnArr.push(item);
                });
                this.setState({
                    likedRecipes: returnArr,
                })
            }
        });
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        const {foods} = this.state;
        return (
            
                

            <div>
               
                <Navigation />
                
                <button class="Btn-css btn btn-primary"
                    onClick={() => {
                        this.setState({
                            foods: [],
                            optionSelected: [] }, () =>
                            this.getRecipes()
                        );
                    }}
                >
                    {"Clear"}
                </button>

                <button class="Btn-css btn btn-warning"
                    onClick={() => {
                        this.getRecipes()
                    }}
                >
                    {"Cook"}
                </button>

                <button class="Btn-css btn btn-success"
                    onClick={() => {
                        this.setState({
                            fav_food: this.state.foods
                        })
                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`)
                        .update({
                            fav_food: this.state.fav_food
                        });

                    }}
                >
                    {"Add favorite"}
                </button>

                <div class ="selectText">
                    <p>Select ingredients:</p>
                </div>
                
                
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
                        {this.state.recipes}
                    </div>
            </div>
                   
        );

    }

}


export default Home;

