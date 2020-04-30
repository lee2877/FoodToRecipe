import React, { Component } from "react";
import fire from '../config/Fire'


class InputComment extends Component{
  constructor(props) {
    super(props);
    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      value: '',
    }
  }

  
  handleCommentChange(event) {
    this.setState({ value: event.target.value })
  }

  submitComment() {
    var userId = fire.auth().currentUser.uid;
    var newCommentRef = fire.database().ref('/recipes/' + this.props.recipe + '/comments/').push();
    newCommentRef.set({
      userId: userId,
      text: this.state.value,
    })
    this.setState({
      value: ''
    })
  }

  render(){
    return(
      <div>
      <input value={this.state.value} onChange={this.handleCommentChange} placeholder="Add a comment.." className="comment-input" />
      <button onClick={() => this.submitComment()}>Submit</button>
    </div>
    )
  }
} export default InputComment;