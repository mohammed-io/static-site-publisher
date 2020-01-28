import { promises as fs } from 'fs';
import path from 'path';
import slugify from 'slugify';

export const post = async (req, res) => {
  const { image, title = '' } = req.body;

  if (!image) {
    return res.json({ success: false, message: 'Ignoring' });
  }

  const [dataPart, imagePart] = image.split(';base64,');

  const [_, extension] = dataPart.split('/');

  const titleToBe = slugify(title) || Number(new Date()).toString(36);

  const url = `images/${titleToBe}.${extension}`;

  await fs.writeFile(path.resolve(process.cwd(), 'static', url), imagePart, {
    encoding: 'base64',
  });

  res.json({ success: true, url });
};
