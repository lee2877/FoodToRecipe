import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import fire from '../config/Fire'


class InputComment extends Component {
  constructor(props) {
    super(props);

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      value: '',
      edit: false,
    }
  }

  componentDidMount() {
    if (this.props.comment) {
      this.setState({
        value: this.props.comment.text,
        edit: true,
      })
    }
  }

  handleCommentChange(event) {
    this.setState({ value: event.target.value })
  }

  submitComment() {
    var userId = fire.auth().currentUser.uid;
    if (this.state.edit) {
      fire.database().ref('/recipes/' + this.props.recipe + '/comments/' + this.props.comment.commentId).update({
        text: this.state.value
      })
      this.props.toggleEdit();
    }
    else {
      var newCommentRef = fire.database().ref('/recipes/' + this.props.recipe + '/comments/').push();
      newCommentRef.set({
        userId: userId,
        text: this.state.value,
      })
    }
    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <div style={{ position: "relative", width: "fit-content" }}>
        <input
          value={this.state.value}
          onChange={this.handleCommentChange}
          placeholder="Add a comment.."
          className="comment-input"
        />
        <button onClick={() => this.submitComment()} style={{ position: "absolute", right: "0px", background: "none" }}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    )
  }
} export default InputComment;