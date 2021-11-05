import React, { useState } from "react";
import axios from "axios";
import {
  ListItem,
  List,
  TextField,
  Button,
} from "@mui/material";
import RoomWebSocket from './RoomWebSocket';
import { API_ROOT } from "../lib/const";

const Room = (props) => {
  const [newMessage, setNewMessage] = useState('');

  const usersList = (users) => {
    return users.map(user => {
      return <ListItem key={user.id}>{user.name}</ListItem>
    });
  }

  const messagesList = (messages) => {
    return messages.map(message => {
      console.log(message)
      if (message.user_id == props.user.user.id) {
        return (
          <ListItem key={message.id} className="message-right">
            <div className="mes-wrap">
              <p>{message.context}</p>
              <div className="time">
                {Array.from(message.created_at).slice(0, 10).join('')}&nbsp;
                {Array.from(message.created_at).slice(11, 19).join('')}
              </div>
            </div>
          </ListItem>
        );
      } else {
        return (
          <ListItem key={message.id}>
            <div className="mes-wrap-else">
              <p>{message.context}</p>
              <div className="time">
                {Array.from(message.created_at).slice(0, 10).join('')}
                {Array.from(message.created_at).slice(11, 19).join('')}
              </div>
            </div>
          </ListItem>
        );
      }
    });
  }

  const handleMessageInput = (event) => {
    setNewMessage(event.target.value);
  }

  const submitMessage = async (event) => {
    event.preventDefault();
    setNewMessage('');

    if (props.roomData.room && props.user.user) {
      const message = {
        context: newMessage,
        user_id: props.user.user.id,
        room_id: props.roomData.room.id,
      };
      await axios.post(
        `${API_ROOT}/messages`,
        message,
        {headers: props.headers()}
      );
    }
  }

  return (
    <React.Fragment>
      <h1>ROOM</h1>
      <div className="member-wrap">
        <h2>MEMBERS</h2>
        <List>
          {usersList(props.roomData.users)}
        </List>
      </div>
      <form>
        <TextField
          required
          fullWidth
          label='context'
          value={newMessage}
          onChange={handleMessageInput}
        />
        <Button
          type='submit'
          onClick={submitMessage}
          className="submit"
        >SUBMIT</Button>
      </form>
      <List>
        {messagesList(props.roomData.messages.slice().reverse())}
      </List>
      <RoomWebSocket
        cableApp={props.cableApp}
        updateApp={props.updateApp}
        getRoomData={props.getRoomData}
        roomData={props.roomData}
      />
    </React.Fragment>
  )
}

export default Room;
