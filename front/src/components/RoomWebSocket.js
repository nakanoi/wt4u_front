import React, { useEffect } from "react";


const RoomWebSocket = (props) => {
  useEffect(() => {
    const token = window.location.href.split('/').slice(-1)[0];
    props.getRoomData(token);
    props.cableApp.room = props.cableApp.cable.subscriptions.create(
      {
        channel: 'RoomsChannel',
        token: token,
      },
      {
        received: (updateRoom) => {
          props.updateApp(updateRoom);
        }
      }
    )
  }, []);

  return <React.Fragment></React.Fragment>
};

export default RoomWebSocket;
