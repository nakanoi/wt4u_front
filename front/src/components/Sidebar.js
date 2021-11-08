import React from "react";
import { Link } from "react-router-dom";
import TypeForm from "./TypeForm";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  Button,
} from '@mui/material'


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
        {props.user &&
          <h2>{props.user.user.name}</h2>
        }
        {props.type ?
          (props.agent ?
            // Agent
            (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>CATEGORY</TableCell>
                    <TableCell>{props.type.user_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AREA</TableCell>
                    <TableCell>{props.agent.area}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>BUSINESS</TableCell>
                    <TableCell>{props.agent.business}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) :
            // Tourist
            (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>CATEGORY</TableCell>
                    <TableCell>{props.type.user_type}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )
          )
          :
          (
            // Regist Type
            <TypeForm
              setGrandParentIsProcessing={(arg) => setGrandParentIsProcessing(arg)}
              setGrandParentType={(arg) => setGrandParentType(arg)}
              setGrandParentAgent={(arg) => setGrandParentAgent(arg)}
              headers={props.headers}
            />
          )
        }
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <List>
          <ListItem key='signin'>
            <Link to='/signin'>
              <Button>SIGN IN</Button>
            </Link>
          </ListItem>
          <ListItem key='signup'>
            <Link to='/signup'>
              <Button>SIGN UP</Button>
            </Link>
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}

export default Sidebar;