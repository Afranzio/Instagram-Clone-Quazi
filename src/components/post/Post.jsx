import React from 'react';
import Header from './header';
import Footer from './footer';

function Post() {
  return (
    <div className="post-container">
      <Header />
      <img 
      className="post" 
      src="https://www.freecodecamp.org/news/content/images/size/w1000/2020/06/freecodecamp_cover.png" 
      alt="" />
      <Footer />
    </div>
  );
}

export default Post;