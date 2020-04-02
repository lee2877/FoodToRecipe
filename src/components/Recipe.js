import React, { Component } from 'react';
import fire from '../config/Fire';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as OutlineHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar as OutlineStar } from '@fortawesome/free-regular-svg-icons';


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleLike = this.handleLike.bind(this);

    this.state = {
      likes: 0,
      favorited: false,
    };
  }

  componentDidMount() {
    fire.database().ref('/recipes/' + this.props.recipe).on("value", snapshot => {
      if (snapshot.exists()) {
        console.log("Recipe exists. Likes are:" + snapshot.val().likes)
        this.setState({
          likes: snapshot.val().likes
        })
      } else {
        this.setState({
          likes: 0
        })
        fire.database().ref('/recipes/' + this.props.recipe).set({
          title: this.props.recipe,
          uri: this.props.uri,
          likes: this.state.likes,
        })
      }
    });
    for (var i = 0; i < this.props.favRecipes.length; i++) {
      if (this.props.recipe == this.props.favRecipes[i].recipe) {
        this.setState({
          favorited: true,
        })
      }
    }
  }

  handleLike() {

  }

  handleFavorite() {
    this.setState({
      favorited: !this.state.favorited,
    })
    var fav_recRef = fire.database().ref('/users/' + fire.auth().currentUser.uid + '/fav_rec/');
    if (!this.state.favorited) {
      console.log("Adding recipe to fav list");
      fav_recRef.child(this.props.recipe).set({
        title: this.props.recipe,
      })
    }
    else {
      console.log("removing recipe from favlist")
      fav_recRef.child(this.props.recipe).remove();
    }
  }

  render() {
    return (
      <div className="recipe">
        <p className="recipe-title">{this.props.recipe}</p>
        <div>
          <img className="recipe-img" src={this.props.img} />
        </div>

        {/* Bottom section of the recipe card */}
        <div className="recipe-bottom">
          <div className="recipe-likes">
            <FontAwesomeIcon className="recipe-likes-icon" icon={this.props.liked ? SolidHeart : OutlineHeart} />
            <p className="recipe-likes-text">{this.state.likes} Likes</p>
          </div>
          <div className="recipe-favorite">
            <button onClick={() => this.handleFavorite()}>
              <FontAwesomeIcon icon={this.state.favorited ? SolidStar : OutlineStar} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Recipe;