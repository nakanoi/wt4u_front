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


const App = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [agent, setAgent] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/v1/auth/sessions',
        {
          headers: {
            'access-token': Cookies.get('access-token'),
            'client': Cookies.get('client'),
            'uid': Cookies.get('uid'),
          }
        }
      );
      if (res.data.is_login) {
        setLoggedIn(true);
        setUser(res.data.user);
        setType(res.data.type);
        setAgent(res.data.agent);
      }
    } catch (err) {
      console.error(err);
    }
    setParentIsProcessing(false);
  }

  useEffect(() => {
    handleCurrentUser();
  }, [setUser]);

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

  if (isProcessing) {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h1>Processing {String(isProcessing)}, Logged in {String(loggedIn)}</h1>
        <Router>
          <Header
            isLoggedIn={loggedIn}
            setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
            setParentLoggedIn={(arg) => setParentLoggedIn(arg)}
            setParentUser={(arg) => setParentUser(arg)}
            setParentType={(arg) => setParentType(arg)}
            setParentAgent={(arg) => setParentAgent(arg)}
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
              />
            </div>
            <div className="main">
              <Switch>
                <Route
                  path='/signin'
                  exact
                  render={
                    () => <SignIn
                setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                setParentLoggedIn={(arg) => setParentLoggedIn(arg)}
                setParentUser={(arg) => setParentUser(arg)}
                setParentType={(arg) => setParentType(arg)}
                setParentAgent={(arg) => setParentAgent(arg)}
                    />
                  }
                ></Route>
                <Route
                  path='/signup'
                  exact
                  render={
                    () => <SignUp
                setParentIsProcessing={(arg) => setParentIsProcessing(arg)}
                setParentLoggedIn={(arg) => setParentLoggedIn(arg)}
                setParentUser={(arg) => setParentUser(arg)}
                    />
                  }
                ></Route>
                <Route path="/request" exact component={About}></Route>
                <Route path="/about" exact component={About}></Route>
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
