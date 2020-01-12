import moment from 'moment';
import path from 'path';

export const generateNewFilePath = function(slug) {
  const subFolder = moment().format('YYYY-MM');

  return path.resolve(
    process.cwd(),
    'src/blog/posts',
    subFolder,
    `${slug}.json`
  );
};
