import {
  findPostBySlug,
  updatePost,
  deletePost,
} from '../../../blog/posts-repository';

export const get = async (req, res) => {
  const { slug } = req.params;

  const data = await findPostBySlug(slug);

  res.end(
    JSON.stringify({
      success: true,
      message: 'Post retrieved successfully',
      data,
    })
  );
};

export const put = async (req, res) => {
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
};

export const patch = put;

export const del = async (req, res) => {
  const { slug } = req.params;

  if (await deletePost(slug)) {
    return res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  }

  return res.json({
    success: false,
    message: 'Post deleted failed',
  });
};
