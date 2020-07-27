import React, { useState,useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Post from './components/post/Post';
// import Upload from './components/Upload';
import './App.css';


import  firebase  from "firebase";

import {db} from './firebase'

function App() {

  const [posts, setPosts] = useState([])
  

  useEffect(() => {
    db.collection("Instagram-Clone").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          timestamp : firebase.firestore.FieldValue.serverTimestamp(),
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
      <div className='container'>
        <div className="App">
        <Navbar />
      <div> 
      </div>
      <div className='background'>
        {
        posts.map(({id,post}) => (
        <Post
        key={id} 
        username={post.username} 
        location={post.location} 
        imageURL={post.imageURL} 
        command={post.command} 
        />
        ))
        }
      </div>
      </div>
    </div>
  );
}

export default App;