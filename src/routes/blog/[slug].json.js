import { getPosts, findPostBySlug } from '../../blog/posts-repository';

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  return (await findPostBySlug(slug))
    .map(post => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      return res.end(
        JSON.stringify({
          success: true,
          data: post,
        })
      );
    })
    .getOr(() => {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          success: false,
          message: `Not found`,
        })
      );
    });
}
