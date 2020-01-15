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

  maybe
    .map(data =>
      res.json({
        success: true,
        message: 'Post updated successfully',
        data,
      })
    )
    .getOr(() => {
      res.statusCode = 500;

      res.json({
        success: false,
        message: 'Post update failed',
      });
    });
}

export const patch = put;
