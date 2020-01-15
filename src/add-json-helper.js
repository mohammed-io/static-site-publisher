export const addJsonHelperMiddleware = () => (req, res, next) => {
  res.json = data => {
    res.writeHead(res.statusCode, {
      'Content-Type': 'application/json',
    });
    return res.end(JSON.stringify(data));
  };
  next();
};
