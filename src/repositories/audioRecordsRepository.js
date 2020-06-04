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
    return Repository.post(`${resource}${dates}`, keywords);
  },
  getByKeywordsPage(keywords, dates, page, size) {
    return Repository.post(`${resource}/page${dates}&page=${page}&size=${size}`, keywords);
  },
};
