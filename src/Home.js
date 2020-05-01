import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './components/Profile';
import ForgotPW from './components/ForgotPW';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';
import { ingredients } from './ingredients.js';
import { vegetarian } from './vegetarian.js';
import MySelect from "./MySelect.js";
import makeAnimated from "react-select/animated";
import Notifications from "./components/Notifications";
import Ranking from './components/Ranking';
import Switch from "react-switch";
//import { BrowserRouter} from 'react-router-dom';
var ingred = "ingredients";
const animatedComponents = makeAnimated()
class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        
        this.getRecipes = this.getRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleVegetarian = this.handleVegetarian.bind(this);
        this.state = {
            recipes: [],
            foods: [],
            likes: 0,
            favRecipes: [],
            likedRecipes: [],
            sortChecked: false,
            vegetarianChecked: false
            
        }
    }
    

    handleChangeSort(sortChecked) {
        this.setState({ sortChecked });
        this.getRecipes();
    }

    handleVegetarian(vegetarianChecked) {
        this.setState({ vegetarianChecked });
        this.getRecipes();
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
        if(this.state.vegetarianChecked){
            var array = this.state.foods;
            if(array.includes('chicken')){
                var index = array.indexOf('chicken');
                console.log(index);
                array.splice(index,1);
                console.log(this.state.foods);
            }
            if(array.includes('beef')){
                var index2 = array.indexOf('beef');
                console.log(index2);
                array.splice(index2, 1);
                console.log(this.state.foods);
            }
            
            
        }
        let req = apiurl + "&q=" + this.state.foods.toString();
        console.log(req);
        setTimeout(() => {
            fetch(req)
                .then(results => {
                    return results.json();
                }).then((data) => {
                    let recipes = data.hits.map((hit) => {
                        return (
                            <div key={hit.recipe.label} recipe={hit.recipe.label} weight={hit.recipe.totalWeight}>
                                <Recipe
                                    recipe={hit.recipe.label}
                                    uri={hit.recipe.uri}
                                    img={hit.recipe.image}
                                    url={hit.recipe.url}
                                    totalWeight={hit.recipe.label.totalWeight}
                                    favRecipes={this.state.favRecipes}
                                    likedRecipes={this.state.likedRecipes}
                                />
                            </div>
                        )
                    })
                    

                    if(this.state.sortChecked){
                        var sortedMap = new Map([...recipes.entries()].sort(function (a, b) {
                            if (a[1].key.toLowerCase() < b[1].key.toLowerCase()) { return -1; }
                            if (a[1].key.toLowerCase() > b[1].key.toLowerCase()) { return 1; }
                            return 0;
                        }));
              
                        var arr = new Array();
                        for (let recipe of sortedMap.entries()){
                            arr.push(recipe[1]);
                            
                        }

                        var newMap = arr.map(function(data){
                            return data;
                        })

                        this.setState({ recipes: [...newMap] });
                    } else {
                        this.setState({ recipes: recipes});
                    }
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

<<<<<<< HEAD
                
=======
                <button class="Btn-css btn btn-success"
                    onClick={() => {
                        this.setState({
                            fav_food: this.state.foods
                        })
                        fire.database().ref(`/users/${fire.auth().currentUser.uid}`)
                        .update({
                            fav_food: this.state.fav_food
                        });

                    }}
                >
                    {"Add favorite"}
                </button>
>>>>>>> 9697d2d5d83097d2303e51e1cad524c33eeaeef4
                <button class="Btn-css btn btn-primary"
                    onClick={() => {
                        this.setState({ sortChecked : true }),
                        this.getRecipes();

                    }}
                >
                    {"Sort by name"}
                </button>
                
                <button class="Btn-css btn btn-warning"
                    onClick={() => {
                        this.setState({ vegetarianChecked: true }),
                        this.getRecipes();

                    }}
                >
                    {"Vegetarian"}
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

