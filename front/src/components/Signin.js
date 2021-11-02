import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import {
  Button,
  TextField,
} from "@mui/material";

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const data = {
        email: email,
        password: password,
      }
      const res = await axios.post(
        'http://localhost:8080/api/v1/auth/sign_in',
        data,
      )
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
      }
      console.log(res.data);
      console.log(res.headers);
    } catch (error) {
      console.error(error);
    }
  }
  


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

export default SignIn;