import axios from 'axios';

const baseDomain = `http://${process.env.VUE_APP_DOMAIN}:8090`;
const baseURL = `${baseDomain}/api`;

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accesss-Control-Allow-Origin': '*',
    'Accesss-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
