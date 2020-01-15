import { savePost, getPosts } from '../../../blog/posts-repository';

export async function post(req, res) {
  const post = req.body;

  const data = await savePost(post);

  res.end(
    JSON.stringify({
      success: true,
      message: 'Post saved successfully',
      data,
    })
  );
}

export async function get(req, res) {
  res.end(
    JSON.stringify({
      success: true,
      message: 'Post saved successfully',
      data: await getPosts(),
    })
  );
}
