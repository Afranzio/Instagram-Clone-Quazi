// Modules
import React, { useState, useEffect } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/home/home'
import Chat from './components/chat/chat'

// Navbar And Footer
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/footer';

// Style Module
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import firebase from "firebase";

import { db } from './firebase'

function App() {

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState();

  const userChange = (e) => {
    setUser(e)
  }


  useEffect(() => {
    db.collection("Instagram-Clone").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} userChange={userChange} />
          <Switch>
            <Route exact path="/">
              <Home posts={posts} user={user} userChange={userChange} />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
          </Switch>
        <Footer className="px-3" />
      </div>
    </Router>
  );
}

export default App;