import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  TextField,
} from "@mui/material";
import { API_ROOT } from "../lib/const";


const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${API_ROOT}/auth/sessions`,
        {headers: props.headers()}
      );
      if (res.data.is_login) {
        props.setParentUser(res.data);
        props.setParentType(res.data.type);
        props.setParentAgent(res.data.agent);
        props.setRoomLogining();
      }
    } catch (err) {
      console.error(err);
    }
    props.setParentIsProcessing(false);
  }

  const handleSignIn = async () => {
    props.setParentIsProcessing(true);
    try {
      const data = {
        email: email,
        password: password,
      }
      const res = await axios.post(
        `${API_ROOT}/auth/sign_in`,
        data,
      )
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
        props.setParentLoggedIn(true);
        handleCurrentUser();
        props.setRoomLogining();
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
        <h1>SignIn</h1>
        <form>
          <TextField
            required
            fullWidth
            label='メールアドレス'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            required
            fullWidth
            label='パスワード'
            type='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            color='primary'
            onClick={handleSignIn}
          >送信</Button>
        </form>
      </React.Fragment>
    ) 
  }
}

export default SignIn;