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
  const [isLoading, setIsLoading] = useState(true);
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
      const data = res.data;
      if (data.is_login) {
        setLoggedIn(true);
        setUser(data.user);
        setType(data.type);
        setAgent(data.agent);
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    handleCurrentUser();
  }, [setUser]);

  if (isLoading) {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Router>
          <Header />
          <div className="content">
            <div className="sidebar">
              <Sidebar isLoggedIn={loggedIn} user={user} type={type} agent={agent} />
            </div>
            <div className="main">
              <Switch>
                <Route path='/signin' exact component={SignIn}></Route>
                <Route path='/signup' exact component={SignUp}></Route>
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
