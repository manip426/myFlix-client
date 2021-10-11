import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";


import "./registration-view.scss"

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');


  /**
   * registers new users
   * @function onRegister
   */
  const onRegister = () => {
    axios.post('https://manpreet-movieapi.herokuapp.com/movies', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob,
    })
      .then(response => {
        props.onRegister(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        window.open('/client', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, dob);
    // send a request to the server for authentication 
    props.onLoggedIn(username)
  };

  /**
   * when potential user doesn't register
   * @function noRegister 
   */
  const noRegister = (e) => {
    e.preventDefault();
    console.log('go back')
    props.notLogged()
  }


  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Enter New Username</Form.Label>
        <Form.Control type="text" placeholder="New Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control type="text" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter User Email</Form.Label>
        <Form.Control type="text" placeholder="User Email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicDateOfBirth">
        <Form.Label>Enter Date of Birth</Form.Label>
        <Form.Control type="date" value={dob} onChange={e => setDob(e.target.value)} />
      </Form.Group>
      <Link to={`/login`}>
        <Button variant="link" type="button" onClick={onRegister}>New User</Button>
      </Link>
      {/* <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button> */}
      <Link to={`/`}>
        <Button onClick={() => onClick(movie)} variant="link">Go Back</Button>
        {/* <Button variant="link" type="button" onClick={props.onRegisterClick}>New User</Button> */}
      </Link>
      {/* <Button variant="secondary" type="button" onClick={noRegister}>Go Back</Button> */}
    </Form>
  );
}