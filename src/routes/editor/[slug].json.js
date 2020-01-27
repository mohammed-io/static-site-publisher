import {
  findPostBySlug,
  updatePost,
  deletePost,
} from '../../blog/posts-repository';

export const get = async (req, res) => {
  const { slug } = req.params;

  return (await findPostBySlug(slug))
    .map(data =>
      res.json({
        success: true,
        message: 'Post retrieved successfully',
        data,
      })
    )
    .getOr(() => {
      res.statusCode = 404;

      res.json({
        success: false,
        message: 'Post not found',
      });
    });
};

export const put = async (req, res) => {
  const { slug } = req.params;
  const post = req.body;

  const result = await updatePost(slug, post);

  return result.select({
    success: data =>
      res.json({
        success: true,
        message: 'Post updated successfully',
        data,
      }),

    error: err => {
      res.statusCode = 500;

      res.json({
        success: false,
        message: 'Post update failed',
      });
    },
  });
};

export const patch = put;

export const del = async (req, res) => {
  const { slug } = req.params;

  return (await deletePost(slug)).select({
    success: () =>
      res.json({
        success: true,
        message: 'Post deleted successfully',
      }),
    error: () =>
      res.json({
        success: false,
        message: 'Post deleted failed',
      }),
  });
};
