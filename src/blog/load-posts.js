import { traverseDir } from '../utils/traverseDir';
import { promises as fs } from 'fs';
import path from 'path';

let cachedPosts = null;

/**
 *
 * @param {*} page
 * @param {*} perPage
 * @returns {Promise<[]>}
 */
export const getPosts = async (page = null, perPage = 10) => {
  const sliceArgs = page === null ? [] : [(page - 1) * perPage, page * perPage];

  if (cachedPosts) return cachedPosts.slice(...sliceArgs);

  cachedPosts = await traverseDir('src/blog/posts').then(paths => {
    return Promise.all(
      paths
        .filter(file => file.endsWith('.json'))
        .sort((a, b) => {
          const [file1, file2] = [path.basename(a), path.basename(b)];

          return file2.localeCompare(file1);
        })
        .map(async file =>
          JSON.parse(await fs.readFile(file).then(r => r.toString()))
        )
    );
  });

  return cachedPosts.slice(...sliceArgs);
};

export const invalidatePosts = () => (cachedPosts = null);
