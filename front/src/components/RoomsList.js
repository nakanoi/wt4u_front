import React from "react";
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  Button,
} from "@mui/material";


const RoomsList = (props) => {
  const mapRooms = (rooms) => {
    return rooms.map((room) => {
      const title = room.title,
            token = room.token;
      return (
        <ListItem key ={token}>
          <h3>{title}</h3>
          {room.users.map(member => {
            return <p>{member.name}</p>
          })}
          <Link to={`/rooms/${token}`}>
            <Button>Go</Button>
          </Link>
        </ListItem>
      )
    })
  }

  return (
    <React.Fragment>
      <h1>Rooms</h1>
      <List>
        {mapRooms(props.allRooms)}
      </List>
    </React.Fragment>
  )
}

export default RoomsList
