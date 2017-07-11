import React,{Component} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/index'
import {Link} from 'react-router'
import InfiniteScroll from 'react-infinite-scroller';

 class PostsIndex extends Component {

   constructor(props) {
     super(props);
   }

  componentWillMount() {
    this.props.fetchPosts();

  }

  loadFunc() {
    console.log('loadMore');
  }

  renderPosts(){

    return this.props.posts.map((post)=>{
      return(
        <Link to = {"posts/" + post.id}>
        <li className="list-group-item" key={post.id}>
          <span className= "pull-xs-right">{post.categories}</span>
          <strong>{post.title}</strong>
          <p>{post.preview_text}</p>
          <p>{post.timestamp}</p>
        </li>
      </Link>
     )
    })
  }

  render(){
    return(
      <div>
        <div>List of Blog Posts</div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
          Add to Post
          </Link>
        </div>
        <h3>
        Posts
        </h3>
        <ul className="list-group">

           {this.renderPosts()}
        </ul>

      </div>
    );
  }
}
function mapStateToProps(state){
  return{posts:state.posts.all};
}

export default connect(mapStateToProps,{fetchPosts})(PostsIndex);
