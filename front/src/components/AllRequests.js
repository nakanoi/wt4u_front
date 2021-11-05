import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  List,
  ListItem,
} from '@mui/material'
import { API_ROOT } from '../lib/const';


const AllRequest = (props) => {
  const [allRequests, setAllRequests] = useState([]);

  const getRandomString = () => {
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const N = 40;
    return Array.from(
        crypto.getRandomValues(new Uint8Array(N))
      ).map(
        (n)=>S[n % S.length]
      ).join('');
  }

  const getAllRequest = async () => {
    await axios.get(
      `${API_ROOT}/requests`,
      {headers: props.headers()}
    ).then(res => {
      setAllRequests(res.data);
    }).catch(err => {
      console.error(err);
    });
  }

  const openRoom = async (event) => {
    event.preventDefault();
    const token = event.target.dataset.token,
          title = event.target.dataset.title,
          poster = event.target.dataset.poster,
          name = event.target.dataset.name,
          data = {
            token: token,
            title: title,
            poster: Number(poster),
            name: name,
          };

    await axios.post(
      `${API_ROOT}/rooms`,
      data,
      {headers: props.headers()}
    ).then(res => {
      console.log(res.data);
      props.setRoomLogining()
    })

  }

  useEffect(() => {
    getAllRequest();
  }, []);

  const listAllRequests = () => {
    let token = null;
    return allRequests.map(request => {
      token = getRandomString();
      console.log(request);
      return (
        <ListItem key={request.id}>
          <Link to={`rooms/${token}`}>
            <Button
              data-token={token}
              data-title={request.title}
              data-poster={request.user_id}
              data-name={request.name}
              onClick={(event) => openRoom(event)}
            >{request.title}</Button>
          </Link>
        </ListItem>
      );
    });
  }

  return (
    <React.Fragment>
      <h1>All Requests</h1>
      <List>
        {listAllRequests()}
      </List>
    </React.Fragment>
  );
};

export default AllRequest;
