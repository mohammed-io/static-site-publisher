<script>
  import Loadable from 'svelte-loadable/Loadable.svelte';

  export let post = {};

  async function save() {
    await fetch(`/editor.json`, {
      body: JSON.stringify(post),
      method: 'POST',
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
