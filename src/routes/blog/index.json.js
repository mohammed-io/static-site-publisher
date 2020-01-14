import { getPosts } from '../../blog/load-posts';

const contents = async () =>
  JSON.stringify(
    (await getPosts()).map(post => {
      return {
        title: post.title,
        slug: post.slug,
      };
    })
  );

export async function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(await contents());
}
