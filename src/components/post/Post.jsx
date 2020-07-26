import React from 'react';
import Header from './header';
import Footer from './footer';

function Post( {username, location, imageURL, command} ) {
  return (
    <div className="post-container">
      <Header username={username} location={location} />
      <img 
      className="post" 
      src={imageURL} 
      alt="" />
      <Footer username={username} command={command} />
    </div>
  );
}

export default Post;