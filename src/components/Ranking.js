import React, { Component } from 'react';
import fire from '../config/Fire';
import {withRouter} from 'react-router-dom';
import { browserHistory } from 'react-router';
import './Ranking.css';
import { render } from 'react-dom';
import Recipe from './Recipe';
class Ranking extends Component{

    constructor(props){
        super(props);
        this.handleGoBack=this.handleGoBack.bind(this);
        this.getRank=this.getRank.bind(this);
        this.getRecipes=this.getRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            recipes: ["test"],
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
        console.log(req);
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
                    //console.log(recipes);                    
                    this.setState({ recipes: recipes });
                })
        })
    }

    getRank(){
        var arr = new Array();
     
        console.log("recipe "+ this.props.recipe);
        var rankRec = fire.database().ref('/recipes/');
        rankRec.orderByChild('likes').limitToLast(10).on("child_added",snap => {
            arr.push(snap.key.toString());
            console.log(snap.key + ' Likes ' + snap.val().likes);
            //console.log(snap);
        })

        // rankRec.once("value",function(data){
            // console.log(data.val());
        // })

        // var arr2 = ["1", "2"];

        console.log(arr.key);
        // console.log(arr2);

        this.setState({ recipes: arr.key });
    }

    handleGoBack =()=>{
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
       
                <button className="btn btn-info Btn" type="submit" onClick={this.handleGoBack} >Go Back</button>
                <button className="btn btn-info Btn" type="submit" onClick={this.getRank} >GetRank</button>

                <div className="recipe-list">
                    {this.state.recipes}
                </div>

                <div class="BottomBar2">
                  Copyright by Haeun Lee, Brian Long, Taehoon Kim (2020)
                </div>

            </div>
        );
    }
}

export default withRouter(Ranking);