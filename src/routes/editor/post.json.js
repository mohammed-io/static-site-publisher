import { savePost } from '../../blog/posts-repository';

export async function post(req, res) {
  const post = req.body;

  const payload = await savePost(post);

  res.end(
    JSON.stringify({
      success: true,
      message: 'Post saved successfully',
      payload,
    })
  );
}
