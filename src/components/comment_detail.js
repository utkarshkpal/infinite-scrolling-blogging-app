import React,{Component} from 'react'

class CommentIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      liked:false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){

    if(this.state.liked)
    this.setState({liked:false});
    else
    this.setState({liked:true});

  }


  render(){

    if(!(this.state.liked)){
      var label = 'Like';
      var classname = 'btn btn-primary'
    }
    else{
       label = 'Unlike';
       classname ='btn btn-danger';
    }

    var comment = this.props.comment;
    return(
      <li className="list-group-item" key={comment.comment_text}>
        <strong>{comment.comment_text}</strong>
        <button className={classname} onClick = {this.handleClick}>
        {label}
        </button>
      </li>
    );
  }
}

export default CommentIndex;
