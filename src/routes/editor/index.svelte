<script>
  import { onMount } from 'svelte';

  let allPosts = [];

  onMount(async () => {
    allPosts = await fetch('/blog.json')
      .then(res => res.json())
      .then(res => res.data);
  });
</script>

{#each allPosts as post (post.slug)}
  <article class="bg-gray-100 p-3 my-3 rounded">
    <h1 class="font-bold text-3xl">
      <a href="/editor/{post.slug}">{post.title}</a>
    </h1>
    <p>
      {@html post.body}
    </p>
  </article>
{/each}
