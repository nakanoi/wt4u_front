import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { API_ROOT } from "../lib/const";


const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${API_ROOT}/auth/sessions`,
        {headers: props.headers()}
      );
      if (res.data.is_login) {
        props.setParentUser(res.data);
      }
    } catch (err) {
      console.error(err);
    }
    props.setParentIsProcessing(false);
  }

  const handleSignUp = async () => {
    props.setParentIsProcessing(true);
    try {
      const data = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password,
      }
      const res = await axios.post(
        `${API_ROOT}/auth`,
        data,
      )
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
        props.setParentLoggedIn(true);
        handleCurrentUser();
      }
    } catch (error) {
      console.error(error);
      props.setParentIsProcessing(false);
    }
  }

  if (props.isLoggedIn) {
    return <Redirect to='/'/>
  } else {
    return (
      <React.Fragment>
        <h1>SignUp</h1>
        <form>
          <p>Name</p>
          <TextField
            required
            fullWidth
            label='Name'
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <p>Email</p>
          <TextField
            required
            fullWidth
            label='Email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <p>Password</p>
          <TextField
            required
            fullWidth
            label='Password'
            value={password}
            key='password'
            type='password'
            onChange={event => setPassword(event.target.value)}
          />
          <p>Confirmation</p>
          <TextField
            required
            fullWidth
            label='Password Comfirmation'
            type='password'
            value={confirmation}
            key='password-confirmation'
            onChange={event => setConfirmation(event.target.value)}
          />
          <Button
            color='primary'
            onClick={handleSignUp}
          >Sign Up</Button>
        </form>
      </React.Fragment>
    )
  }
}

export default SignUp;