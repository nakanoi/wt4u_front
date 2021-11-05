import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  List,
  ListItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
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

  const requestUI = (request, token) => {
    return (
      <React.Fragment>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{request.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Area</TableCell>
              <TableCell>{request.area}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>{request.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Days</TableCell>
              <TableCell>{request.days}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>{request.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cost</TableCell>
              <TableCell>{request.cost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Genre</TableCell>
              <TableCell>{request.genre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Posted at</TableCell>
              <TableCell>{Array.from(request.created_at).slice(0, 10).join('')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link className="request-button" to={`rooms/${token}`}>
          <Button
            data-token={token}
            data-title={request.title}
            data-poster={request.user_id}
            data-name={request.name}
            onClick={(event) => openRoom(event)}
            className="request-button"
          >Contact To This Request</Button>
        </Link>
      </React.Fragment>
    )
  }

  const listAllRequests = () => {
    let token = null;
    return allRequests.map(request => {
      token = getRandomString();
      console.log(request);
      return (
        <ListItem key={request.id} className="request-list">
          {requestUI(request, token)}
        </ListItem>
      );
    });
  }

  return (
    <React.Fragment>
      <h1>ALL REQUESTS</h1>
      <List>
        {listAllRequests()}
      </List>
    </React.Fragment>
  );
};

export default AllRequest;
