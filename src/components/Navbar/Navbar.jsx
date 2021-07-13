import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { auth } from '../../firebase';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField } from '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum';

import './navbar.css'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    margin: '15px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Navbar = ({ user, userChange }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false)

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const signin = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        userChange(authUser);
        setOpenSignIn(false);
      })
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  const signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
        setOpen(false);
      })
      .catch((error) => alert(error.message))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has loggedd in
        userChange(authUser);
      }
      else {
        //user has logged out
        userChange(null)
      }
    })
    return () => {
      unsubscribe()
    };
  }, [user, username, userChange])

  const body = (
    <form onSubmit={signup}>
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Signup</h2>
        <TextField id="standard-basic"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <TextField id="standard-basic"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <TextField id="standard-basic"
          type='password'
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button type='submit' onClick={signup} >Signup</Button>
      </div>
    </form>
  );

  const bodyIn = (
    <form onSubmit={signin}>
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Sign In</h2>
        <TextField id="standard-basic"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <TextField id="standard-basic"
          type='password'
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button type='submit' onClick={signin}>SignIn</Button>
      </div>
    </form>
  );

  return (
    <div className='navbar fixed-top'>
      <div className="container">
        <a href="#/">
          <img src={window.location.origin + '/logo.png'} alt="" className="logo" />
        </a>
        <div>
          {/* <Button size='small' variant="outlined" color="primary" onClick={() => setOpenSignIn(true)}>Sign In</Button> */}
          <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodyIn}
          </Modal>
          {/* <Button size='small' variant="outlined" color="primary" onClick={() => setOpen(true)} >Sign Up</Button> */}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
        {user ? (
          <div>
            <Button
              className={classes.btn}
              size='small'
              onClick={() => window.location = `#/chat`}
            >
              <ForumIcon />
            </Button>
            <Button
              className={classes.btn}
              size='small'
              onClick={() => auth.signOut()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="auth__btn">
            <Button
              className={classes.btn}
              onClick={() => window.location = "#/signup"}
            >
              Sign Up
            </Button>
            <Button
              className={classes.btn}
              onClick={() => window.location = "#/login"}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;