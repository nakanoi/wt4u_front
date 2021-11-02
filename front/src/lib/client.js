import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';


const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseUR: "http://localhost:8080/api/v1"
  }),
  options
);

export default client;
