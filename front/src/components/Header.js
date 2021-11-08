import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
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
        <List>
          <ListItem key="home">
            <Link to='/'>
              <Button
                color='primary'
              >HOME</Button>
            </Link>
          </ListItem>
          <ListItem key="about">
            <Link to='/about'>
              <Button
                color='primary'
              >ABOUT</Button>
            </Link>
          </ListItem>
          {props.isLoggedIn && props.type && props.type.user_type === 'tourist' && (
            <ListItem key="request">
              <Link to='/request'>
                <Button
                  color='primary'
                >REQUEST</Button>
              </Link>
            </ListItem>
          )}
          {props.isLoggedIn && props.type && props.type.user_type === 'agent' && (
            <ListItem key="all-requests">
              <Link to='/requests'>
                <Button
                  color='primary'
                >ALL REQUESTS</Button>
              </Link>
            </ListItem>
          )}
          {props.isLoggedIn && (
            <ListItem key="rooms">
              <Link to='/rooms'>
                <Button
                  color='primary'
                >ROOMS</Button>
              </Link>
            </ListItem>
          )}
          {props.isLoggedIn && (
            <ListItem key='signout'>
              <Button
                color='primary'
                onClick={handleSignOut}
              >SIGN OUT</Button>
            </ListItem>
            )}
        </List>
      </header>
    </React.Fragment>
  )
}

export default Header;