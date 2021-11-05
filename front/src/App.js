import './App.css';
import './style.css'
import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Sidebar from './components/Sidebar';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import SendRequest from './components/SendRequest';
import RoomsList from './components/RoomsList';
import Room from './components/Room';
import AllRequest from './components/AllRequests';
import { API_ROOT } from './lib/const';


const App = (props) => {
  const initialCurrentRoom = {
    room: {},
    users: [],
    messages: [],
  }
  const headers = () =>{
    return {
    'access-token': Cookies.get('access-token'),
    'client': Cookies.get('client'),
    'uid': Cookies.get('uid'),
    }
  }

  const [isProcessing, setIsProcessing] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [agent, setAgent] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(initialCurrentRoom);

  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${API_ROOT}/auth/sessions`,
        {headers: headers()}
      );
      if (res.data.is_login) {
        setLoggedIn(true);
        setUser(res.data);
        setType(res.data.type);
        setAgent(res.data.agent);

        await axios.get(
          `${API_ROOT}/rooms`,
          {headers: headers()}
        ).then(response => {
          setAllRooms(response.data);
        });
      }
    } catch (err) {
      console.error(err);
    }
    setParentIsProcessing(false);
  }

  const setRoomLogining = async () => {
    await axios.get(
      `${API_ROOT}/rooms`,
      {headers: headers()}
    ).then(response => {
      console.log(response.data);
      setAllRooms(response.data);
    });
  }

  useEffect(() => {
    handleCurrentUser();
  }, [setUser]);

  const getRoomData = async (token) => {
    const res = await axios(
      `${API_ROOT}/rooms/${token}`,
      {headers: headers()}
    );
    setCurrentRoom(
      {
        room: res.data,
        users: res.data.users,
        messages: res.data.messages,
      }
    );
  }

  const updateAppStateRoom = (newRoom) => {
    setCurrentRoom(
      {
        room: newRoom.room,
        users: newRoom.users,
        messages: newRoom.messages,
      }
    )
  }

  const postFirstMessage = async (roomId, token) => {
    window.history.pushState(null, null, `/rooms/${roomId}`);
    const message = {
      context: `${user.user.name} has joined the room.`,
      user_id: user.user.id,
      room_id: roomId,
    };
    await axios.post(
      `${API_ROOT}/messages`,
      message,
      {headers: headers()}
    );
  }

  const subscribeToRoom = (event) => {
    const room_id = event.target.id;
    const token = window.location.href.split('/').slice(-1)[0];
    if (user) {
      postFirstMessage(room_id, token);
    } else {
      alert('No.');
    }
  }

  // 子でprocessing
  const setParentIsProcessing = (arg) => {
    setIsProcessing(arg);
  }
  // 子でlogged in
  const setParentLoggedIn = (arg) => {
    setLoggedIn(arg);
  }
  // 子でuser
  const setParentUser = (arg) => {
    setUser(arg);
  }
  // 子でtype
  const setParentType = (arg) => {
    setType(arg);
  }
  // 子でagent
  const setParentAgent = (arg) => {
    setAgent(arg);
  }
  // 子でrooms
  const setParentRooms = () => {
    getRoomData();
  }

  if (isProcessing) {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Router>
          <Header
            isLoggedIn={loggedIn}
            type={type}
            setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
            setParentLoggedIn={(arg) => setParentLoggedIn(arg)}
            setParentUser={(arg) => setParentUser(arg)}
            setParentType={(arg) => setParentType(arg)}
            setParentAgent={(arg) => setParentAgent(arg)}
            headers={headers}
          />
          <div className="content">
            <div className="sidebar">
              <Sidebar
                isLoggedIn={loggedIn}
                user={user}
                type={type}
                agent={agent}
                setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                setParentUser={(arg) => setParentUser(arg)}
                setParentType={(arg) => setParentType(arg)}
                setParentAgent={(arg) => setParentAgent(arg)}
                headers={headers}
              />
            </div>
            <div className="main">
              <Switch>
                <Route
                  path='/signin'
                  exact
                  render={
                    () => <SignIn
                      isLoggedIn={loggedIn}
                      setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                      setParentLoggedIn={(arg) => setParentLoggedIn(arg)}
                      setParentUser={(arg) => setParentUser(arg)}
                      setParentType={(arg) => setParentType(arg)}
                      setParentAgent={(arg) => setParentAgent(arg)}
                      setRoomLogining={() => setRoomLogining()}
                      headers={headers}
                    />
                  }
                ></Route>
                <Route
                  path='/signup'
                  exact
                  render={
                    () => <SignUp
                      isLoggedIn={loggedIn}
                      setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                      setParentLoggedIn={(arg) => setParentLoggedIn(arg)}
                      setParentUser={(arg) => setParentUser(arg)}
                      headers={headers}
                    />
                  }
                ></Route>
                {loggedIn &&
                  <Route
                    path='/request'
                    exact
                    render={
                      () => <SendRequest
                        setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                        headers={headers}
                      />
                    }
                  ></Route>
                }
                {loggedIn &&
                  <Route
                    path='/requests'
                    exact
                    render={
                      () => <AllRequest
                        setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                        setRoomLogining={setRoomLogining}
                        headers={headers}
                      />
                    }
                  ></Route>
                }
                {loggedIn &&
                  <Route
                    path='/rooms'
                    exact
                    render={
                      () => <RoomsList
                        user={user}
                        allRooms={allRooms}
                        handleSubscribe={subscribeToRoom}
                      />
                    }
                  ></Route>
                }
                {loggedIn &&
                  <Route
                    path='/rooms/:token'
                    exact
                    render={
                      () => <Room
                        cableApp={props.cableApp}
                        getRoomData={getRoomData}
                        updateApp={updateAppStateRoom}
                        roomData={currentRoom}
                        user={user}
                        headers={headers}
                      />
                    }
                  ></Route>
                }
                <Route path='/about' exact component={About}></Route>
                <Route path='/' exact component={Home}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
