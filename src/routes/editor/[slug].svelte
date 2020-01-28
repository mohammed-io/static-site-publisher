<script context="module">
  export async function preload({ params }) {
    return {
      post: await this.fetch(`/blog/${params.slug}.json`)
        .then(res => res.json())
        .then(res => res.data),
    };
  }
</script>

<script>
  import Loadable from 'svelte-loadable/Loadable.svelte';

  export let post = {};

  async function save() {
    await fetch(`/editor/${post.slug}.json`, {
      body: JSON.stringify(post),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(console.log);
  }
</script>

<Loadable
  loader={() => import('../../components/editor/PostEditor.svelte')}
  let:component>
  <svelte:component
    this={component}
    bind:body={post.body}
    bind:slug={post.slug}
    bind:title={post.title}
    bind:meta={post.meta}
    on:save={save} />
</Loadable>
