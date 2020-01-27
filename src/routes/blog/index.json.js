import { getPosts } from '../../blog/posts-repository';

const contents = async (page = 1) => {
  const { length: total } = await getPosts();

  return {
    success: true,
    total,
    data: await getPosts(page),
  };
};

export async function get(req, res) {
  const { page } = req.query;

  return res.json(await contents(page));
}
