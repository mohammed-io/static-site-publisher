import { register, init } from 'svelte-i18n';

register('en', () => import('./languages/en.js'));
register('ar', () => import('./languages/ar.js'));

init({
  fallbackLocale: 'en',
});
