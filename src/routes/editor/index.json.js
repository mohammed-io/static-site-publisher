import { savePost, getPosts } from '../../blog/posts-repository';

export async function post(req, res) {
  const post = req.body;

  return (await savePost(post)).select({
    success: data =>
      res.json({
        success: true,
        message: 'Post saved successfully',
        data,
      }),
    error: err => {
      res.statusCode = 500;

      return res.json({
        success: false,
        message: err.message,
      });
    },
  });
}

export async function get(req, res) {
  res.json({
    success: true,
    message: 'All posts retrieved successfully',
    data: await getPosts(),
  });
}
