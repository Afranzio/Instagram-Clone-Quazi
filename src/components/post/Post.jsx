import React from 'react';
import Header from './header';
import Footer from './footer';

function Post( {username, postId,location, imageURL, command} ) {
  return (
    <div className="post-container">
      <Header username={username} location={location} />
      <img 
      className="post" 
      src={imageURL} 
      alt="" />
      <Footer username={username} command={command} postId={postId} />
    </div>
  );
}

export default Post;