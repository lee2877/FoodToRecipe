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
            recipes: ["Here"],
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
        var temparr = ["1"];
     
        console.log("recipe "+ this.props.recipes);
        var rankRec = fire.database().ref('/recipes/');
        rankRec.orderByChild('likes').limitToLast(10).on("child_added",snap => {
            
            arr.push(snap.key.toString());
            // temparr.push(snap.key.toString());
            console.log(snap.key + ' Likes ' + snap.val().likes);
            //console.log(snap);
        })

        // rankRec.once("value",function(data){
            // console.log(data.val());
        // })

        var arr2 = ["1", "2"];
        console.log("hahaha");
        console.log(arr);
        console.log(arr[1]);
        var arr3 = new Array();
        
        arr3.push("10: "+arr[0]);
        arr3.push("9:  "+arr[1]);
        arr3.push("8:  "+arr[2]);
        arr3.push("7:  "+arr[3]);
        arr3.push("6:  "+arr[4]);
        arr3.push("5:  "+arr[5]);
        arr3.push("4:  "+arr[6]);
        arr3.push("3:  "+arr[7]);
        arr3.push("2:  "+arr[8]);
        arr3.push("1: "+ arr[9]);


        // arr.keys;
        // // console.log("!hohoho?");
        // console.log("newARr" + arr3);
        //console.log(arr3[1]);
        // console.log(temparr.pop());

        
        this.setState({ recipes: arr3 });

        // console.log("-------------------------------------");
        // console.log(this.state.recipes);
    }

    handleGoBack =()=>{
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
       
                <button className="btn btn-info Btn" type="submit" onClick={this.handleGoBack} >Go Back</button>
                <button className="btn btn-info Btn" type="submit" onClick={this.getRank} >GetRank</button>
                <div>
                <div class='recipe-list'>{this.state.recipes[9]}</div>
                <div class='recipe-list'>{this.state.recipes[8]}</div>
                <div class='recipe-list'>{this.state.recipes[7]}</div>
                <div class='recipe-list'>{this.state.recipes[6]}</div>
                <div class='recipe-list'>{this.state.recipes[5]}</div>
                <div class='recipe-list'>{this.state.recipes[4]}</div>
                <div class='recipe-list'>{this.state.recipes[3]}</div>
                <div class='recipe-list'>{this.state.recipes[2]}</div>
                <div class='recipe-list'>{this.state.recipes[1]}</div>
                <div class='recipe-list'>{this.state.recipes[0]}</div>
                </div>



                <div class="BottomBar2">
                  Copyright by Haeun Lee, Brian Long, Taehoon Kim (2020)
                </div>

            </div>
        );
    }
}

export default withRouter(Ranking);