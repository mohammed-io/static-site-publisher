import { promises as fs } from 'fs';
import path from 'path';

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
export async function traverseDir(dir) {
  dir = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);

  return fs.readdir(dir).then(files => {
    return Promise.all(
      files.map(async file => {
        const fullPath = path.join(dir, file);
        if ((await fs.lstat(fullPath)).isDirectory()) {
          return await traverseDir(fullPath);
        }

        return fullPath;
      })
    ).then(files => files.flat());
  });
}
