import React, { Component } from 'react';
import { render } from 'react-dom';
import fire from '../config/Fire';
import { Link } from 'react-router-dom';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.getUsername = this.getUsername.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  getUsername(userId) {
    var username;
    fire.database().ref('/users/' + userId).on('value', snapshot => {
      username = snapshot.val().username;
    })
    return username;
  }

  deleteComment(commentId) {
    fire.database().ref('/recipes/' + this.props.recipe + '/comments/').child(commentId).remove();
  }

  render() {
    if (this.props.comments) {
      const commentsList = this.props.comments.map((comment) =>
        <div key={comment.user + comment.text} className="indv-comment">
          <Link to={"/profile/" + comment.userId} style={{ textDecoration: "none", color: "black"}}>
            <div style={{ fontWeight: 600 }}>{this.getUsername(comment.userId)}:</div>
          </Link>
          <div style={{ textIndent: 8, textAlign: "left" }}>{comment.text}</div>
          <div>
            {(comment.userId === fire.auth().currentUser.uid)
              ?
              <div>
                <button>Edit</button>
                <button className="delete-comment" onClick={() => this.deleteComment(comment.commentId)}>X</button>
              </div>
              : <div />}
          </div>
        </div>
      )
      return (
        commentsList
      );
    } else return null;
  }

} export default Comments;