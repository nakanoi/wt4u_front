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
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDateFns'

import { GENRE_OPTIONS, AREA_OPTIONS } from "../lib/Options";
import { API_ROOT } from "../lib/const";


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
        `${API_ROOT}/requests`,
        request,
        {headers: props.headers()}
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
      <h1>REQUEST</h1>
      <form>
        <List>
          <ListItem className='column-list'>
            <p>AREA</p>
            <Select
              required
              fullWidth
              label='AREA'
              value={area}
              onChange={event => setArea(event.target.value)}
            >
              {AREA_OPTIONS.map(
                (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              )}
            </Select>
          </ListItem>
          <ListItem className='column-list'>
            <p>TRAVEL TITLE</p>
            <TextField
              required
              fullWidth
              label='title'
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>COST</p>
            <TextField
              required
              fullWidth
              label='cost'
              type='number'
              value={cost}
              onChange={event => setCost(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>FELLOW NUMBER</p>
            <TextField
              required
              fullWidth
              fullWidth
              label='number'
              type='number'
              value={number}
              onChange={event => setNumber(event.target.value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>DEPARTURE DATE</p>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                required
                label='date'
                value={date}
                onChange={(val) => setDate(val)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem className='column-list'>
            <p>TRAVEL DAYS</p>
            <TextField
              required
              fullWidth
              label='days'
              value={days}
              onChange={event => setDays(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>TRAVEL GENRE</p>
            <Select
              required
              fullWidth
              label='genre'
              value={genre}
              onChange={event => setGenre(event.target.value)}
            >
              {GENRE_OPTIONS.map(
                (item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              )}
            </Select>
          </ListItem>
          <ListItem className='column-list'>
            <p>RANGE</p>
            <TextField
              required
              fullWidth
              label='range'
              type='number'
              value={range}
              onChange={event => setRange(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <p>DETAILS</p>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label='details'
              value={context}
              onChange={event => setContext(event.target.value)}
            />
          </ListItem>
          <ListItem className='column-list'>
            <Button
              color='primary'
              onClick={postRequest}
              fullWidth
            >REQUEST</Button>
          </ListItem>
        </List>
      </form>
    </React.Fragment>
  )
}

export default SendRequest;
