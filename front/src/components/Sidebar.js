import React, { useEffect } from "react";
import { Link } from "react-router-dom";


function Sidebar(props) {
  const [user, setUser] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [agent, setAgent] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    setUser(props.user);
    setType(props.type);
    setAgent(props.agent);
    setIsLoggedIn(props.isLoggedIn);
  }, []);

  if (isLoggedIn) {
    return (
      <React.Fragment>
        <h2>Sidbar</h2>
        {user &&
          <div>
            <h3>名前: {user.name}</h3>
            <h3>Email: {user.email}</h3>
          </div>
        }
        {type ?
          (agent ?
            // Agent
            (
              <div>
                <p>種別: {type.user_type}</p>
                <p>地域: {agent.area}</p>
                <p>業種: {agent.business}</p>
              </div>
            ) :
            // Tourist
            (
              <div>
                <p>種別: {type.user_type}</p>
              </div>
            )
          )
          :
          (
            // Regist Type
            <div>
              <p>Todo: 種別登録フォーム</p>
            </div>
          )
        }
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h1>Sidbar</h1>
        <div>Todo: ログインフォーム</div>
        <Link to='/signin'>サインイン</Link>
        <Link to='/signup'>サインアップ</Link>
      </React.Fragment>
    )
  }
}

export default Sidebar;