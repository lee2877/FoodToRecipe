import React, { Component } from 'react';
import fire from '../config/Fire';
import {withRouter} from 'react-router-dom';
import { browserHistory } from 'react-router';
import './Ranking.css';
import { render } from 'react-dom';
import Recipe from './Recipe';
import Navigation from './Navigation';
class Ranking extends Component{

    constructor(props){
        super(props);
        this.handleGoBack=this.handleGoBack.bind(this);
        this.getRank=this.getRank.bind(this);
        
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            recipes: ["Click the GetRank button twice"],
            foods: [],
            likes: 0,
            favRecipes: [],
            likedRecipes: [],
            countLikes:[],
            uriCheck: []
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
    



    getRank(){
        var arr = new Array();
        var likeCount = new Array();
        var uriArr = new Array();
     
        //make reference from the DB and sort them by the Likes.
        // and get 10 itesm from the sorted list from the end.
        // so we can get the 10 items which have likes in increasing order.
        var rankRec = fire.database().ref('/recipes/');
        rankRec.orderByChild('likes').limitToLast(10).on("child_added",snap => {
            
            arr.push(snap.key.toString());
            // temparr.push(snap.key.toString());
            console.log(snap.key + ' Likes ' + snap.val().likes);
            console.log("like is :" + snap.val().likes);
            likeCount.push(snap.val().likes);
            //uriArr.push(snap.val().uri);
            //console.log("Snap URI: "+snap.key.uri);
        })
        
        var arr2 = ["1", "2"];

        var arr3 = new Array();
        var templike = new Array();
        var tempUri = new Array();


        //Add the title of the Recipe and Like in one line.
        var step;
        var cStep =10;
        for( step =0; step<10;step++){
            arr3.push(cStep+" : "+arr[step] +"- Likes " + likeCount[step]);
            cStep--;
        }

        // tempUri.push("Recipe Link : "+ uriArr[0]);
        // tempUri.push("Recipe Link : "+ uriArr[1]);
        // tempUri.push("Recipe Link : "+ uriArr[2]);
        // tempUri.push("Recipe Link : "+ uriArr[3]);
        // tempUri.push("Recipe Link : "+ uriArr[4]);
        // tempUri.push("Recipe Link : "+ uriArr[5]);
        // tempUri.push("Recipe Link : "+ uriArr[6]);
        // tempUri.push("Recipe Link : "+ uriArr[7]);
        // tempUri.push("Recipe Link : "+ uriArr[8]);
        // tempUri.push("Recipe Link : "+ uriArr[9]);

        // console.log("uri check : "+ uriArr[0]);

        // arr.keys;
        // // console.log("!hohoho?");
        // console.log("newARr" + arr3);
        //console.log(arr3[1]);
        // console.log(temparr.pop());

        //copy the value of the array to State
        this.setState({ recipes: arr3 });
        this.setState({ uriCheck : tempUri });


    }

    handleGoBack =()=>{
        this.props.history.goBack();
    }

    render(){
        return(
            <div>

                <Navigation />
                <button className="btn btn-info Btn" type="submit" onClick={this.getRank} >GetRank</button>
                <p className='rank-title'>Top 10 Recipies</p>

                <p className='recipe-list-rank' >{this.state.recipes[9]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[8]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[7]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[6]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[5]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[4]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[3]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[2]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[1]}</p>                
                <p className='recipe-list-rank'>{this.state.recipes[0]}</p>
               
                <div className="BottomBar2">
                  Copyright by Haeun Lee, Brian Long, Taehoon Kim (2020)
                </div>

            </div>
        );
    }
}

export default withRouter(Ranking);