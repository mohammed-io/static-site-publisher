import { promises as fs, existsSync } from 'fs';
import slugify from 'slugify';
import path from 'path';
import { generateNewFilePathFor } from '../../blog/config';
import { compileTemplate } from '../../blog/post-template';
import { invalidatePosts } from '../../blog/load-posts';

export async function post(req, res) {
  const post = req.body;

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

  const blogFilePath = await generateNewFilePathFor(payload);

  if (!existsSync(path.dirname(blogFilePath))) {
    await fs.mkdir(path.dirname(blogFilePath), { recursive: true });
  }

  await fs.writeFile(blogFilePath, compileTemplate(payload));

  invalidatePosts();

  res.end(
    JSON.stringify({
      success: true,
      message: 'Post saved successfully',
      payload,
    })
  );
}
