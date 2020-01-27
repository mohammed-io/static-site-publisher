import { getPosts, findPostBySlug } from '../../blog/posts-repository';

export async function get(req, res, next) {
  const { slug } = req.params;

  return (await findPostBySlug(slug))
    .map(post => {
      return res.json({
        success: true,
        data: post,
      });
    })
    .getOr(() => {
      res.statusCode = 404;

      res.json({
        success: false,
        message: `Not found`,
      });
    });
}
