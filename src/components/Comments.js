import React, { Component } from 'react';
import { render } from 'react-dom';

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const commentsList = this.props.comments.map((comment) => 
      <div key={comment.text} className="indv-comment">
        <div style={{fontWeight: 600}}>{comment.user}:</div>
        <div style={{textIndent: 8, textAlign: "left"}}>{comment.text}</div>
      </div>
    )
    return(
      commentsList
    );
  }

}export default Comments;