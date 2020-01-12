import './polyfills';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import './i18n';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    sirv('static', { dev }),
    compression({ threshold: 0 }),
    bodyParser.json({ limit: '50MB' }),
    sapper.middleware({ ignore: dev ? undefined : '/editor' })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
