import Repository from './Repository';

const resource = '/keywords';
export default {
  get() {
    return Repository.get(`${resource}`);
  },
  post(payload) {
    Repository.post(`${resource}`, payload);
  },
  delete(id) {
    Repository.delete(`${resource}/${id}`);
  },
};
