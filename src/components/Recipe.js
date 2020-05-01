import React, { Component } from 'react';
import fire from '../config/Fire';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as OutlineHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar as OutlineStar } from '@fortawesome/free-regular-svg-icons';
import Comments from './Comments';
import InputComment from './InputComment';
//import Notifications from './Notifications';




  

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleLike = this.handleLike.bind(this);

    this.state = {
      img: '',
      likes: 0,
      favorited: false,
      liked: false,
      comments: [],
    };
  }

  
  componentDidMount() {
    
    fire.database().ref('/recipes/' + this.props.recipe).on("value", snapshot => {
      if (snapshot.exists()) {
        var returnArr = [];
        snapshot.child('comments').forEach(function (childSnapshot) {
          var comment = childSnapshot.val();
          comment.commentId = childSnapshot.key
          returnArr.push(comment);
        })
        this.setState({
          likes: snapshot.val().likes,
          comments: returnArr,
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
      if (this.props.recipe == this.props.favRecipes[i].title) {
        this.setState({
          favorited: true,
        })
      }
    }
    for (var i = 0; i < this.props.likedRecipes.length; i++) {
      if (this.props.recipe == this.props.likedRecipes[i].title) {
        this.setState({
          liked: true,
        })
      }
    }
  }

  handleLike() {
    var like_recRef = fire.database().ref('/users/' + fire.auth().currentUser.uid + '/liked_rec/');
    if (!this.state.liked) {
      like_recRef.child(this.props.recipe).set({
        title: this.props.recipe,
        uri: this.props.uri,
        url: this.props.url,
        img: this.props.img
      });
      fire.database().ref('/recipes/' + this.props.recipe).update({
        likes: this.state.likes + 1
      });
      this.setState({
        likes: this.state.likes + 1
      });
    }
    else {
      like_recRef.child(this.props.recipe).remove();
      fire.database().ref('/recipes/' + this.props.recipe).update({
        likes: this.state.likes - 1
      });
      this.setState({
        likes: this.state.likes - 1
      });
    }
    this.setState({
      liked: !this.state.liked,
    })

    
    
  }

  handleFavorite() {
    var fav_recRef = fire.database().ref('/users/' + fire.auth().currentUser.uid + '/fav_rec/');
    if (!this.state.favorited) {
      fav_recRef.child(this.props.recipe).set({
        title: this.props.recipe,
        uri: this.props.uri,
        url: this.props.url,
        img: this.props.img
      })
    }
    else {
      fav_recRef.child(this.props.recipe).remove();
    }
    this.setState({
      favorited: !this.state.favorited,
    })
  }


  render() {
    return (
      <div className="recipe">
        <p className="recipe-title">{this.props.recipe}</p>
        <a href={this.props.url} className="recipe-link">
          <div>
            <img className="recipe-img" src={this.props.img} />
          </div>
        </a>

        {/* Bottom section of the recipe card */}
        <div className="recipe-bottom">
          <div className="recipe-likes">
            <button className="recipe-likes-icon" onClick={() => this.handleLike()}>
              <FontAwesomeIcon icon={this.state.liked ? SolidHeart : OutlineHeart} />
            </button>
            <p className="recipe-likes-text">{this.state.likes} Likes</p>
          </div>
          <button className="recipe-favorite" onClick={() => this.handleFavorite()}>
            <FontAwesomeIcon icon={this.state.favorited ? SolidStar : OutlineStar} />
          </button>
        </div>
        {this.state.comments.map((comment) => 
          <Comments comment={comment} key={comment.commentId} {...this.props} />
        )}
        <InputComment {...this.props} />
      </div>
    )
  }
}
export default Recipe;