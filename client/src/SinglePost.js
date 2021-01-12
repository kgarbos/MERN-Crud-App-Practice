import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import renderHTML from 'react-render-html';

const SinglePost = props => {
  const [post, setPost] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then(response => setPost(response.data))
      .catch(error => alert('Error loading single post'));
  }, []);

  const showSinglePost = () => (
    <div className="row">
      <div className="col-mid-8 pt-3 pb-2">
        <h1>{post.title}</h1>
        <div className="lead pt-3">{renderHTML(post.content)}</div>
        <p>
          Author: <strong>{post.user}</strong> <span>&nbsp;</span> 
          Published on:<span>&nbsp;</span>
          <strong>{new Date(post.createdAt).toLocaleString()}</strong>
        </p>
      </div>
    </div>
  );

  return (
    <div className="container pb-5">
      <Nav />
      {post && showSinglePost()}
    </div>
  );

};



export default SinglePost;