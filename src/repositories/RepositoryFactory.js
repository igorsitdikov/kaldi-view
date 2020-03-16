import keywordsRepository from './keywordsRepository';

const repositories = {
  keywords: keywordsRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};

// export { RepositoryFactory as default };
