import React from "react";
import { Link } from "react-router-dom";
import TypeForm from "./TypeForm";


function Sidebar(props) {
  // 子でprocessing
  const setGrandParentIsProcessing = (arg) => {
    props.setParentIsProcessing(arg);
  }
  // 子でtype
  const setGrandParentType = (arg) => {
    props.setParentType(arg);
  }
  // 子でagent
  const setGrandParentAgent = (arg) => {
    props.setParentAgent(arg);
  }

  if (props.isLoggedIn) {
    return (
      <React.Fragment>
        <h2>Sidbar</h2>
        {props.user &&
          <div>
            <h3>名前: {props.user.name}</h3>
            <h3>Email: {props.user.email}</h3>
          </div>
        }
        {props.type ?
          (props.agent ?
            // Agent
            (
              <div>
                <p>種別: {props.type.user_type}</p>
                <p>地域: {props.agent.area}</p>
                <p>業種: {props.agent.business}</p>
              </div>
            ) :
            // Tourist
            (
              <div>
                <p>種別: {props.type.user_type}</p>
              </div>
            )
          )
          :
          (
            // Regist Type
            <TypeForm
              setGrandParentIsProcessing={(arg) => setGrandParentIsProcessing(arg)}
              setGrandParentType={(arg) => setGrandParentType(arg)}
              setGrandParentAgent={(arg) => setGrandParentAgent(arg)}
            />
          )
        }
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h1>Sidbar</h1>
        <Link to='/signin'>サインイン</Link>
        <Link to='/signup'>サインアップ</Link>
      </React.Fragment>
    )
  }
}

export default Sidebar;