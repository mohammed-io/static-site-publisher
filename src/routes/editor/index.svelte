<script>
  import { onMount } from 'svelte';
  import moment from 'moment';

  let allPosts = [];

  onMount(async () => {
    allPosts = await fetch('/blog.json')
      .then(res => res.json())
      .then(res => res.data);
  });
</script>

<div class="py-3 my-5">
  <a
    href="/editor/new"
    class="btn text-blue-500 hover:text-blue-600 border border-blue-500
    hover:border-blue-600">
    New Post
  </a>
</div>
{#each allPosts as post (post.slug)}
  <a href="/editor/{post.slug}">
    <article class="p-3 my-5 rounded shadow">
      <time class="text-sm text-gray-700">
        {moment(post.updatedAt).format('MMM DD, YYYY')}
      </time>
      <h1 class="font-bold text-3xl py-4">{post.title}</h1>
      <p>
        {@html post.body.substring(0, 200)}
        ...
      </p>
    </article>
  </a>
{/each}
