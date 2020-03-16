import axios from 'axios';
import domain from '../config/config';

const apiUrl = `${domain}/api`;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Accesss-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Accesss-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';


const aInst = axios.create({
  baseURL: apiUrl,
});

const api = {};
api.install = (Vue, option) => {
  Vue.prototype.$api = {
    records: {
      get(dates) {
        return aInst.get(`/audiorecords${dates}`);
      },
      post(keywords, dates) {
        return aInst.post(`/audiorecords${dates}`, keywords);
      },
      getNumNotTranscribed() {
        return aInst.get('/file/records/empty');
      },
    },
    track: {
      get(id) {
        return aInst.get(`/audiorecords/${id.toString()}`);
      },
    },
    keywords: {
      get() {
        return aInst.get('/keywords');
      },
      post(word) {
        aInst.post('/keywords', { keyword: word });
      },
      postSelected(array, keyword) {
        console.log(keyword);
        return aInst.post('/file/records/selected', { array, keyWords: keyword });
      },
      delete(id) {
        aInst.delete(`/keywords/${id}`);
      },
    },
  };
};

export default api;
