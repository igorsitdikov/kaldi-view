import Repository from './Repository';

const resource = '/audiorecords';

export default {
  get(dates) {
    return Repository.get(`${resource}${dates}`);
  },
  getTrackById(id) {
    return Repository.get(`${resource}/${id}`);
  },
  getByKeywords(keywords, dates) {
    return Repository.put(`${resource}${dates}`, keywords);
  },
};
