import { promises as fs } from 'fs';
import path from 'path';

export const del = async (req, res) => {
  const { image } = req.params;

  if (!image) {
    return res.json({ success: false, message: 'Ignoring' });
  }

  const file = path.resolve(process.cwd(), 'static/images', image);
  await fs.unlink(file);

  return res.json({
    success: true,
    message: 'Image deleted successfully',
  });
};
