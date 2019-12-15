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
        return aInst.get(`/file/records?date=${dates}`);
      },
      getNumNotTranscribed() {
        return aInst.get('/file/records/empty');
      },
    },
    track: {
      get(id) {
        return aInst.get(`/track/${id.toString()}`);
      },
    },
    keywords: {
      get() {
        return aInst.get('/db/keywords');
      },
      post(id, keyword) {
        aInst.post('/db/keywords', { id, keyword });
      },
      postSelected(array, keyword) {
        console.log(keyword);
        return aInst.post('/file/records/selected', { array, keyWords: keyword });
      },
      delete(id) {
        aInst.get(`/db/keywords/${id}`);
      },
    },
  };
};

export default api;
