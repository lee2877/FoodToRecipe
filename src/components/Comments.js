import React, { Component } from 'react';
import fire from '../config/Fire';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import InputComment from './InputComment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.getUsername = this.getUsername.bind(this);
    this.editComment = this.editComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.state = {
      username: '',
      editing: false,
    }
  }

  componentDidMount() {
    this.getUsername(this.props.comment.userId)
  }

  getUsername(userId) {
    var username;
    fire.database().ref('/users/' + userId).on('value', snapshot => {
      username = snapshot.val().username;
    })
    this.setState({
      username: username
    })
  }

  editComment() {
    this.setState({
      editing: !this.state.editing
    })
  }

  deleteComment(commentId) {
    fire.database().ref('/recipes/' + this.props.recipe + '/comments/').child(commentId).remove();
  }

  render() {
    return (
      <div className="indv-comment">
        <Link to={"/profile/" + this.props.comment.userId} style={{ textDecoration: "none", color: "black" }}>
          <div style={{ fontWeight: 600 }}>{this.state.username}:</div>
        </Link>
        {this.state.editing
          ? <InputComment comment={this.props.comment} toggleEdit={() => this.editComment()} {...this.props} />
          : <div style={{ textIndent: 8, textAlign: "left" }}>{this.props.comment.text}</div>}
        {(this.props.comment.userId === fire.auth().currentUser.uid)
          ?
          <div style={{ position: "absolute", right: "5px" }}>
            <button className="comment-edit" onClick={() => this.editComment()} >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button className="delete-comment" onClick={() => this.deleteComment(this.props.comment.commentId)}>X</button>
          </div>
          : <div />}
      </div>
    );
  }

} export default Comments;