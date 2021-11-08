import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { AREA_OPTIONS, BUSINESS_OPTIONS } from '../lib/Options'
import { API_ROOT } from "../lib/const";


const TypeForm = (props) => {
  const [area, setArea] = useState('');
  const [business, setBusiness] = useState('');

  // 旅行者/事業者登録
  const handleType = async (e) => {
    try {
      const type = e.target.dataset.type,
            data = {'type': type};
      let agentData;

      if (type === 'agent') {
        if (area && business) {
          agentData = {
            'area': area,
            'business': business,
          }
        } else {
          alert ('地域/事業者種別を入力');
          return;
        }
      }
      props.setGrandParentIsProcessing(true);
      // 種別
      const resType = await axios.post(
        `${API_ROOT}/types`,
        data,
        {headers: props.headers()}
      );
      props.setGrandParentType(resType.data);
      // 事業者種別
      if (type === 'agent') {
        const resAgent = await axios.post(
          `${API_ROOT}/agents`,
          agentData,
          {headers: props.headers()}
        );
        props.setGrandParentAgent(resAgent.data);
      }
    } catch (error) {
      console.error(error);
    }
    props.setGrandParentIsProcessing(false);
  }

  return (
    <React.Fragment>
      <h1>Your Type</h1>
      <form>
        <Button
          color='primary'
          data-type='tourist'
          onClick={e => handleType(e)}
        >I'm a Tourist</Button>
        <p>or</p>
        <p>Area</p>
        <Select
          fullWidth
          label='Area'
          defaultValue=''
          value={area}
          onChange={event => setArea(event.target.value)}
        >
          {AREA_OPTIONS.map(
            (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
          )}
        </Select>
        <p>Agent</p>
        <Select
          fullWidth
          label='agent'
          defaultValue=''
          value={business}
          onChange={event => setBusiness(event.target.value)}
        >
          {BUSINESS_OPTIONS.map(
            (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
          )}
        </Select>
        <Button
          color='primary'
          data-type='agent'
          onClick={e => handleType(e)}
        >I'm a Agent</Button>
      </form>
    </React.Fragment>
  )
}

export default TypeForm;