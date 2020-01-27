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
</script>

<Loadable
  loader={() => import('../../components/editor/PostEditor.svelte')}
  {...post} />
