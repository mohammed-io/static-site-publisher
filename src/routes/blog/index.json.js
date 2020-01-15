import { getPosts } from '../../blog/posts-repository';

const contents = async (page = 1) => {
  const { length: total } = await getPosts();

  const result = {
    success: true,
    total,
    data: (await getPosts(page)).map(post => {
      return {
        title: post.title,
        slug: post.slug,
      };
    }),
  };

  return JSON.stringify(result);
};

export async function get(req, res) {
  const { page } = req.query;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(await contents(page));
}
