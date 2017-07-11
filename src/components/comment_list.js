import React,{Component,PropTypes} from 'react';
import CommentDetail from './comment_detail'

class CommentList extends React.Component {

  constructor(props){
    super(props);
  }

  renderComments(){

    let reachedBottom = this.props.reachedBottom;

    if(reachedBottom == 'true'){

      return this.props.comments.map((comment)=>{
        return(
          <ul className="col-md-4-list-group">
          <CommentDetail comment = {comment} />
           </ul>
          )
      });
    }
  }

  render() {

    return (
      <ul className="list-group">
        {this.renderComments()}
      </ul>
    );
  }
}

export default CommentList;
