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
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import ingredients from './ingredients.js';

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
            loading: false,
        }

    }


    handleChange = (event) => {

        this.setState({
            foods: (event.target.value)
        }

        )
    }
    /* Need to fix with calling the user uid + changing the user info with favorite ingredients.
    handleFavoriteChange = () => {
        fire.database().ref('user/'+this.props.user.uid).set({
            numFav_rec: 2,
        }).then(() => {console.log("aa")})
        .catch((errors) => {
            console.log(errors);
            
        })

    }
    */
    clear = () => {

        this.setState({
            foods: [],
        });

    }

    itemRender = (li, itemProps) => {
        const itemChildren = (
            <span>
                <input type="checkbox" checked={itemProps.selected} onChange={() => { }} />
                &nbsp;{li.props.children}
            </span>
        );
        return React.cloneElement(li, li.props, itemChildren);
    }

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
                        fire.database().ref('/recipes/' + hit.recipe.label).on("value", snapshot => {
                            if (snapshot.exists()){
                                console.log("Recipe exists. Likes are:"+snapshot.val().likes)
                                this.setState({
                                    likes: snapshot.val().likes
                                })
                            }else{
                                this.setState({
                                    likes: 0
                                })
                                fire.database().ref('/recipes/' + hit.recipe.label).set({
                                    title: hit.recipe.label,
                                    likes: this.state.likes,
                                    comments: [],
                                })
                            }
                            this.setState({
                                loading: false,
                            })
                        });
                        console.log(this.state.likes);
                        return (
                            <div key={hit.recipe.label}>
                                <Recipe title={hit.recipe.label} img={hit.recipe.image} likes={this.state.likes} />
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
        const value = this.state.value;
        const selected = 0;
        return (
            <div>
                <Navigation />

                <div className="home">
                    <p>Select ingredients:</p>
                    <MultiSelect
                        data={ingredients}
                        itemRender={this.itemRender}
                        autoClose={true}
                        value={value}
                        onChange={this.handleChange}
                    />

                    <button onClick={this.handleFavoriteChange} class="favoriteFoodButton" type="submit">
                        add to favorite
                    </button>
                    <button onClick={() => this.getRecipes()}>Submit</button>


                    <div className="recipe-list">
                        {this.state.recipes}
                    </div>
                </div>
            </div>

        );

    }

}


export default Home;

