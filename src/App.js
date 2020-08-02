import React, { useState,useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Post from './components/post/Post';
// import Upload from './components/Upload';
import ImageUploader from './ImageUpload';
import './App.css';


import  firebase  from "firebase";

import {db} from './firebase'

function App() {

  const [posts, setPosts] = useState([])
  const [user, setUser]=useState();

  const userChange = (e) => {
    setUser(e)
  }
  

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
  },[]);

  return (
      <div className='container'>
        <div className="App">
        <Navbar user={user} userChange={userChange} />
      <div className='upload-container'>
        {user ? (<ImageUploader username={user.displayName} />)
                :
                <h2>Please Login to Upload Photos</h2>
              }
      </div>
      <div className='background'>
        {
        posts.map(({id,post}) => (
        <Post
        key={id} 
        postId={id}
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