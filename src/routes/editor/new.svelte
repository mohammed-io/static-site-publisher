<script>
  import Loadable from 'svelte-loadable/Loadable.svelte';
</script>

<Loadable loader={() => import('../../components/editor/PostEditor.svelte')} />
