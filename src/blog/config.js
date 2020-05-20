import moment from 'moment';
import path from 'path';

export const rootPostsDir = 'posts-db';

export const generateNewFilePathFor = async post => {
  const { slug, createdAt } = post;
  const subFolder = moment().format('YYYY-MM');

  return path.resolve(
    process.cwd(),
    rootPostsDir,
    subFolder,
    `${Number(createdAt)}--${slug}.json`
  );
};

export const locales = null;
