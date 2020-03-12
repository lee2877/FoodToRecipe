import React, { Component } from 'react';

class Recipe extends Component {
  constructor(props) {
      super(props);
  }

  render(){
    return(
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.calories}</p>
      </div>
    )
  }
}
export default Recipe;