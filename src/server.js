import './polyfills';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { traverseDir } from './utils/traverseDir';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({ ignore: dev ? undefined : '/editor' })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });

traverseDir(process.cwd() + '/src/routes').then(console.log);
