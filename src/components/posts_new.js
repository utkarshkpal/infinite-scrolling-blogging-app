import React,{Component,PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import {createPosts} from '../actions/index';
import {Link} from 'react-router';

 class PostsNew extends Component{

   static contextTypes = {                        //use context only in case  router

     router:PropTypes.object                      //router is available throughtout the application
                                                   //but is accessible through the  parent.
   }

   onSubmit(props){

     this.props.createPosts(props).then(()=>{           //our action createPosts returns a promise
    //when promise is resolved ie blog post is created navigate to index
     this.context.router.push('/');

   });

   }


  render(){

    const {fields:{title,categories,content},handleSubmit} = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        <br />
        <div className={`form-group ${ title.touched && title.invalid ?'has-danger':''}`}>
          <label>Title</label>
          <input type ="text" className="form-control" {...title }/>
          <div className="text-help">
           {title.touched ? title.error:''}      {/* this not the errors object we created, title has bulit in error property*/}
          </div>
        </div>

        <div className={`form-group ${ categories.touched && categories.invalid ?'has-danger':''}`}>
          <label>Categories</label>
          <input type ="text" className="form-control" {...categories}/>
          <div className="text-help">
           {categories.touched ? categories.error:''}
        </div>
        </div>


        <div className={`form-group ${ content.touched && content.invalid ?'has-danger':''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help">
           {content.touched ? content.error:''}
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>

          <Link to="/" className="btn btn-danger">
          cancel
          </Link>


      </form>
    );
  }
}

 function validate(values) {

  const errors = {};

  if(!values.title){
    errors.title="Enter a title";
  }

  if(!values.categories){
    errors.categories="Enter categories";
  }

  if(!values.content){
    errors.content="Enter some content";
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title','categories','content'],
  validate
},null,{createPosts})(PostsNew);
