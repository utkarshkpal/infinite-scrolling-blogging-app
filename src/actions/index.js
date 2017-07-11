import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POSTS = 'CREATE_POSTS';
export const DELETE_POST = 'DELETE_POST';

import blog_data from '../actions/blog_data.js';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=fksdfjksjfksjdf';

export function fetchPosts() {

    // console.log(blog_data);

  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    // console.log(blog_data);
  // console.log(typeof(blog_data));

  return{
    type:FETCH_POSTS,
    payload:blog_data
    };
}

export function createPosts(props) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,props);

  return{
    type:CREATE_POSTS,
    payload:request
    };
}

export function fetchPost(id) {


  var post = blog_data.filter(function(elem){
    return elem.id == id;
  });
  //  console.log(post);
//  console.log(typeof(post));


  //  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return{
    type:FETCH_POST,
    payload:post
    };
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return{
    type:DELETE_POST,
    payload:request
    };
}
