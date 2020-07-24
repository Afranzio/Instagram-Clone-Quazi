import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Post from './components/post/Post';
import Upload from './components/Upload'
import './App.css';

function App() {
  return (
      <div className='container'>
        <div className="App">
        <Navbar />
      <div>
        <Upload />
      </div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default App;