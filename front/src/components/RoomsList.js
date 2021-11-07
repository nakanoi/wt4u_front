import React from "react";
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";


const RoomsList = (props) => {

  const roomUI = (room) => {
    return (
      <React.Fragment>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Room Title</TableCell>
              <TableCell>{room.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Room Members</TableCell>
              <TableCell>
                {room.users.map(member => {
                  return <p className="room-user">{member.name}</p>
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link className="room-button" to={`/rooms/${room.token}`}>
          <Button className="room-button">Go To This Room</Button>
        </Link>
      </React.Fragment>
    );
  }

  const mapRooms = (rooms) => {
    return rooms.map((room) => {
      return (
        <ListItem className="room-list" key ={room.token}>
          {roomUI(room)}
        </ListItem>
      )
    })
  }

  return (
    <React.Fragment>
      <h1>ROOMS</h1>
      <List>
        {mapRooms(props.allRooms)}
      </List>
    </React.Fragment>
  )
}

export default RoomsList
