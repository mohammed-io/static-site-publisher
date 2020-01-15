import { promises as fs, existsSync } from 'fs';
import slugify from 'slugify';
import path from 'path';
import { generateNewFilePathFor } from './config';
import { compileTemplate } from './post-template';
import { traverseDir } from '../utils/traverseDir';
import { Maybe } from '../utils/Maybe';

let cachedPosts = null;

export const invalidatePosts = () => (cachedPosts = null);

/**
 * @returns {Promise<[]>}
 */
export const getFilesAndPosts = async () => {
  if (!cachedPosts) {
    cachedPosts = await traverseDir('src/blog/posts').then(paths => {
      return Promise.all(
        paths
          .filter(file => file.endsWith('.json'))
          .sort((a, b) => {
            const [file1, file2] = [path.basename(a), path.basename(b)];

            return file2.localeCompare(file1);
          })
          .map(async file => [
            file,
            JSON.parse(await fs.readFile(file).then(r => r.toString())),
          ])
      );
    });
  }

  return cachedPosts;
};

/**
 *
 * @param {*} page
 * @param {*} perPage
 * @returns {Promise<[]>}
 */
export const getPosts = async (page = null, perPage = 10) => {
  const sliceArgs = page === null ? [] : [(page - 1) * perPage, page * perPage];

  return (await getFilesAndPosts())
    .map(([_, post]) => post)
    .slice(...sliceArgs);
};

export const savePost = async post => {
  if (!post.title) {
    throw new Error('Title is required');
  }

  if (!post.body) {
    throw new Error('Body is required');
  }

  const slug = post.slug || slugify(post.title, { lower: true });

  const dates = {
    createdAt: Number(new Date()),
    updatedAt: Number(new Date()),
  };

  const payload = { ...post, slug, ...dates };

  const postFilePath = await generateNewFilePathFor(payload);

  if (!existsSync(path.dirname(postFilePath))) {
    await fs.mkdir(path.dirname(postFilePath), { recursive: true });
  }

  await fs.writeFile(postFilePath, compileTemplate(payload));

  invalidatePosts();

  return payload;
};

export const findPostBySlug = async slug => {
  const post = (await getPosts()).find(p => p.slug === slug);

  return Maybe.of(post);
};

export const updatePost = async (slug, update = null) => {
  if (!update) throw new Error('The update should have value');

  const [postFile, post] =
    (await getFilesAndPosts()).find(([_, p]) => p.slug === slug) || [];

  if (!file) return Maybe.none();

  Object.assign(post, update, { updatedAt: Number(new Date()) });

  await fs.writeFile(postFile, compileTemplate(post));

  invalidatePosts();

  return Maybe.of(post);
};

export const deletePost = async slug => {
  const [file] =
    (await getFilesAndPosts()).find(([_, p]) => p.slug === slug) || [];

  if (file) {
    await fs.unlink(file);
    invalidatePosts();
  }

  return !!file;
};
