import keywordsRepository from './keywordsRepository';
import audioRecordsRepository from './audioRecordsRepository';

const repositories = {
  keywords: keywordsRepository,
  records: audioRecordsRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};

// export { RepositoryFactory as default };
