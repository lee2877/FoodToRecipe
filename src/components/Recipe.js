import React, { Component } from 'react';

class Recipe extends Component {
  constructor(props) {
      super(props);
  }

  render(){
    return(
      <div className="recipe">
        <p className="recipe-title">{this.props.title}</p>
        <img className="recipe-img" src={this.props.img}/>
      </div>
    )
  }
}
export default Recipe;