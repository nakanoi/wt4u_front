import React from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDateFns'

import { GENRE_OPTIONS, AREA_OPTIONS } from "../lib/Options";


const SendRequest = (props) => {
  const [area, setArea] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [cost, setCost] = React.useState(0);
  const [number, setNumber] = React.useState(0);
  const [date, setDate] = React.useState(Date());
  const [days, setDays] = React.useState(0);
  const [genre, setGenre] = React.useState('');
  const [range, setRange] = React.useState(0);
  const [context, setContext] = React.useState('');
  
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    return `${y}-${m}-${d}`
  }

  const postRequest = async () => {
    props.setParentIsProcessing(true);
    try {
      const request = {
        area: area,
        title: title,
        cost: Number(cost),
        number: Number(number),
        date: formatDate(date),
        days: Number(days),
        genre: genre,
        range: Number(range),
        context: context,
      }
      console.log(request);
      const res = await axios.post(
        'http://localhost:8080/api/v1/requests',
        request,
        {
          headers: {
            'access-token': Cookies.get('access-token'),
            'client': Cookies.get('client'),
            'uid': Cookies.get('uid'),
          }
        }
      )
      if (res.status === 200) {
      }
    } catch (error) {
      console.error(error);
    }
    props.setParentIsProcessing(false);
  }

  return (
    <React.Fragment>
      <h1>Request</h1>
      <form>
        <List>
          <ListItem className='column-list'>
            <p>地域</p>
            <Select
              required
              fullWidth
              label='地域'
              value={area}
              onChange={event => setArea(event.target.value)}
            >
              {AREA_OPTIONS.map(
                (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              )}
            </Select>
          </ListItem>
          <ListItem className='column-list'>
            <p>投稿タイトル</p>
            <TextField
              required
              fullWidth
              label='投稿タイトル'
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>予算</p>
            <TextField
              required
              fullWidth
              label='予算'
              type='number'
              value={cost}
              onChange={event => setCost(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>旅行者数</p>
            <TextField
              required
              fullWidth
              fullWidth
              label='旅行者数'
              type='number'
              value={number}
              onChange={event => setNumber(event.target.value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>明後日</p>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                required
                label='出発日'
                value={date}
                onChange={(val) => setDate(val)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem className='column-list'>
            <p>日数</p>
            <TextField
              required
              fullWidth
              label='日数'
              value={days}
              onChange={event => setDays(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>ジャンル</p>
            <Select
              required
              fullWidth
              label='ジャンル'
              value={genre}
              onChange={event => setGenre(event.target.value)}
            >
              {GENRE_OPTIONS.map(
                (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              )}
            </Select>
          </ListItem>
          <ListItem className='column-list'>
            <p>範囲</p>
            <TextField
              required
              fullWidth
              label='範囲'
              type='number'
              value={range}
              onChange={event => setRange(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>詳細</p>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label='詳細'
              value={context}
              onChange={event => setContext(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <Button
              color='primary'
              onClick={postRequest}
              fullWidth
            >送信</Button>
          </ListItem>
        </List>
      </form>
    </React.Fragment>
  )
}

export default SendRequest;
