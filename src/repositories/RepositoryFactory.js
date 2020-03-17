import keywordsRepository from './keywordsRepository';
import audiorecordsRepository from './audiorecordsRepository';

const repositories = {
  keywords: keywordsRepository,
  audiorecords: audiorecordsRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};

// export { RepositoryFactory as default };
