import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Button
} from "@mui/material";
import { API_ROOT } from "../lib/const";


const Header = (props) => {
  const handleSignOut = async () => {
    props.setParentIsProcessing(true);
    try {
      const res = await axios.delete(
        `${API_ROOT}/auth/sign_out`,
        {
          headers: {
            'access-token': Cookies.get('access-token'),
            'client': Cookies.get('client'),
            'uid': Cookies.get('uid'),
          }
        }
      );
      if (res.status === 200) {
        props.setParentLoggedIn(false);
        props.setParentUser(null);
        props.setParentType(null);
        props.setParentAgent(null);
        Cookies.remove('access-token');
        Cookies.remove('client');
        Cookies.remove('uid');
      }
    } catch (error) {
      console.log(error);
    };
    props.setParentIsProcessing(false);
  };

  return (
    <React.Fragment>
      <header>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/request">Request</Link></li>
          <li><Link to="/requests">All Requests</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
        </ul>
        <Button
          color='primary'
          onClick={handleSignOut}
        >サインアウト</Button>
      </header>
    </React.Fragment>
  )
}

export default Header;