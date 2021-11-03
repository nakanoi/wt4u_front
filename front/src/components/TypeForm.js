import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { AREA_OPTIONS, BUSINESS_OPTIONS } from '../lib/Options'


const TypeForm = (props) => {
  const [area, setArea] = useState('');
  const [business, setBusiness] = useState('');

  // 旅行者/事業者登録
  const handleType = async (e) => {
    try {
      const type = e.target.dataset.type,
            data = {'type': type},
            headers = {
              'access-token': Cookies.get('access-token'),
              'client': Cookies.get('client'),
              'uid': Cookies.get('uid'),
            }
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
        'http://localhost:8080/api/v1/types',
        data,
        {headers: headers}
      );
      props.setGrandParentType(resType.data);
      // 事業者種別
      if (type === 'agent') {
        const resAgent = await axios.post(
          'http://localhost:8080/api/v1/agents',
          agentData,
          {headers: headers}
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
      <h1>種別登録</h1>
      <form>
        <Button
          color='primary'
          data-type='tourist'
          onClick={e => handleType(e)}
        >旅行者登録</Button>
        <p>OR</p>
        <Select
          fullWidth
          label='地域'
          defaultValue=''
          value={area}
          onChange={event => setArea(event.target.value)}
        >
          {AREA_OPTIONS.map(
            (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
          )}
        </Select>
        <Select
          fullWidth
          label='事業種別'
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
        >事業者登録</Button>
      </form>
    </React.Fragment>
  )
}

export default TypeForm;