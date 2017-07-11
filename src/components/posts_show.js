import React,{Component,PropTypes} from 'react'
import {fetchPost} from "../actions/index"
import {deletePost} from "../actions/index"
import CommentList from './comment_list'

import {connect} from 'react-redux';
import {Link} from 'react-router';

 class PostsShow extends Component {

   constructor(props){
     super(props);

     this.state = {reachedBottom:'false'};
     this.handleScroll = this.handleScroll.bind(this);
   }

   static contextTypes = {                        //use context only in case  router

     router:PropTypes.object                      //router is available throughtout the application
                                                  //but is accessible through the  parent.
   }

    componentWillMount(){

          // console.log(this.props);
          // console.log(this.state.reachedBottom);
          this.props.fetchPost(this.props.params.id);
          window.addEventListener("scroll", this.handleScroll);

    }

    componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


    handleScroll() {

     if(this.state.reachedBottom == 'false'){

       const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
       const body = document.body;
       const html = document.documentElement;
       const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
       const windowBottom = windowHeight + window.pageYOffset;
       if (windowBottom >= docHeight) {
         this.setState({
           reachedBottom:'true'
         });
         // console.log('reached bottom');
       } else {
         this.setState({
           reachedBottom:'false'
         });
       }
     }
  }

    handleClickEvent(event) {
      // console.log("inside delete");
      this.props.deletePost(this.props.params.id).then(()=>{           //our action createPosts returns a promise
     //when promise is resolved ie blog post is created navigate to index
      this.context.router.push('/');

    });
    }




    render(){
      //  console.log(this.props);

     const {post} = this.props;

      //  console.log(post);

     if(!post){
      return <div>Loading....</div>;
     }

     return(
       <div id="post-content">
           <div className="text-xs-right">
             <Link to="/" className="btn btn-primary">
             Back
             </Link>


             <button onClick={this.handleClickEvent.bind(this)} className="btn btn-danger">Delete</button>
           </div>
          <h3>{post[0].title}</h3>
          <h3>{post[0].timestamp}</h3>
          <p>{post[0].body}</p>
          <CommentList comments = {this.props.post[0].comments} reachedBottom = {this.state.reachedBottom}/>
       </div>
     )

  }

}

function mapStateToProps(state){
  return{post:state.posts.post};
}


export default connect(mapStateToProps,{fetchPost,deletePost})(PostsShow);
