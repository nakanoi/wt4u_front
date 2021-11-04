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
      return <ListItem key={message.id}>{message.context}</ListItem>
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
        {headers: props.headers}
      );
    }
  }

  return (
    <React.Fragment>
      <h1>Rooms</h1>
      <h2>Members</h2>
      <List>
        {usersList(props.roomData.users)}
      </List>
      <h2>Contennt</h2>
      <List>
        {messagesList(props.roomData.messages)}
      </List>
      <h2>MessageForm</h2>
      <form>
        <TextField
          required
          fullWidth
          label='投稿タイトル'
          value={newMessage}
          onChange={handleMessageInput}
        />
        <Button
          type='submit'
          onClick={submitMessage}
        >送信</Button>
      </form>
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
