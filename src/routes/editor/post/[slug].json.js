import { findPostBySlug, updatePost } from '../../../blog/posts-repository';

export async function get(req, res) {
  const { slug } = req.params;

  const data = await findPostBySlug(slug);

  res.end(
    JSON.stringify({
      success: true,
      message: 'Post retrieved successfully',
      data,
    })
  );
}

export async function put(req, res) {
  const { slug } = req.params;
  const post = req.body;

  const maybe = await updatePost(slug, post);

  res.end(
    JSON.stringify({
      success: true,
      message: 'Post read successfully',
      data,
    })
  );
}
