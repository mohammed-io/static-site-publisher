import { getPosts } from '../../blog/load-posts';

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  const post = (await getPosts()).find(p => p.slug === slug);

  if (post) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        success: true,
        data: post,
      })
    );
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        success: false,
        message: `Not found`,
      })
    );
  }
}
