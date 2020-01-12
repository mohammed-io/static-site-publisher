<script>
  import QuillEditor from './QuillEditor.svelte';
  import { _ } from 'svelte-i18n';

  export let title = '';
  export let body;
  export let post = null;

  async function publish() {
    await fetch('/editor/post.json', {
      body: JSON.stringify({ body, title }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(console.log);
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="//fonts.googleapis.com/css?family=Karla|Merriweather:400,700,900" />
</svelte:head>
<div class="px-10 py-5">
  <button
    on:click={publish}
    class="btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
    {$_('editor.publish')}
  </button>
</div>
<div class="px-10">
  <input
    type="text"
    bind:value={title}
    placeholder={$_('editor.title')}
    class="w-full outline-none border-0 bg-transparent font-serif text-5xl
    text-gray-800 placeholder-gray-600" />
</div>
<QuillEditor bind:body />
