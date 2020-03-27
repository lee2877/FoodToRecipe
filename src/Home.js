import React, { Component } from 'react';
import './Home.css';
import fire from './config/Fire';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './components/Profile';
import ForgotPW from './components/ForgotPW';
import Navigation from './components/Navigation';
import Recipe from './components/Recipe';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import ingredients from './ingredients.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getRecipes = this.getRecipes.bind(this);

        this.state = {
            recipes: [],
            foods: ["egg","chicken","milk"]
            
        }
        this.handleChange = this.handleChange.bind(this);
        
    }
    

    handleChange = (event) => {
        this.setState({
            foods : [event.target.value]
        });
        // have to push value inside the foods
        console.log(event.target.value);
        console.log(this.state.foods);
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
        const apiurl = "https://api.edamam.com/search?app_id=00b4728c&app_key=ec8f1ca8da43b4304bbbe9e1052816e9"
        let req = apiurl + "&q=" + this.state.foods.toString();
        console.log(req);
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
                    this.setState({recipes: recipes});
                })
        })
    }

    componentDidMount() {
        this.getRecipes();
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
                <p>Select ingredients:</p>
                <MultiSelect
                    data={ingredients}
                    itemRender={this.itemRender}
                    autoClose={true}
                    value={value}
                    onChange={this.handleChange}
                    
                    
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

