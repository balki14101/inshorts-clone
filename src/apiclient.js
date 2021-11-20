import axios from 'axios';

const apiclient = axios.create({
  baseURL: 'https://m.inshorts.com/api/en/',
});

apiclient.interceptors.response.use(
  response => response.data,
  err => {
    return Promise.reject(err);
  },
);

export default apiclient;
