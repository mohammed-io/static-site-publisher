<script>
  import { onMount } from 'svelte';
  import moment from 'moment';

  let allPosts = [];

  onMount(async () => {
    allPosts = await fetch('/blog.json')
      .then(res => res.json())
      .then(res => res.data);
  });

  async function handleDelete(post) {
    if (!confirm('Are you sure to delete this post?')) return;

    await fetch(`/editor/${post.slug}.json`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(console.log)
      .then(() =>
        Promise.all(
          [document.createElement('div')]
            .map(el => {
              el.innerHTML = post.body;
              return el;
            })
            .flatMap(el => [...el.querySelectorAll('img')])
            .map(img => new URL(img.src))
            .filter(url => url.host === location.host)
            .map(url => url.pathname.replace('/images/', ''))
            .map(image =>
              fetch(`/editor/image/${image}.json`, { method: 'DELETE' })
            )
        )
      )
      .then(() => {
        allPosts = allPosts.filter(p => p !== post);
      });
  }

  function excerpt(text, limit = 200) {
    if (text.length < limit) return text;

    return text.substring(0, limit) + '...';
  }
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
  <article class="p-3 my-5 rounded shadow font-serif">
    <div class="flex flex-row">
      <time class="text-sm text-gray-700 flex-1">
        {moment(post.updatedAt).format('MMM DD, YYYY')}
      </time>
      <button
        class="h-5 w-5 focus:outline-none"
        on:click={() => handleDelete(post)}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="fill-current text-red-500">
            <path
              d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3
              0v10h1V8h-1z" />
          </svg>
        </span>
      </button>
    </div>
    <a href="/editor/{post.slug}">
      <h1 class="font-semibold text-3xl py-5">{post.title}</h1>
      <p>
        {@html excerpt(post.body)}
      </p>
    </a>
  </article>
{/each}
