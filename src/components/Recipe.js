import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as OutlineHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar as OutlineStar } from '@fortawesome/free-regular-svg-icons';


class Recipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recipe">
        <p className="recipe-title">{this.props.title}</p>
        <div>
          <img className="recipe-img" src={this.props.img} />
        </div>

        {/* Bottom section of the recipe card */}
        <div className="recipe-bottom">
          <div className="recipe-likes">
            <FontAwesomeIcon className="recipe-likes-icon" icon={this.props.liked ? SolidHeart : OutlineHeart} />
            <p className="recipe-likes-text">{this.props.likes} Likes</p>
          </div>
          <div className="recipe-favorite">
            <FontAwesomeIcon icon={this.props.favorited ? SolidStar : OutlineStar} />
          </div>
        </div>
      </div>
    )
  }
}
export default Recipe;