<script>
  import QuillEditor from './QuillEditor.svelte';
  import {_ } from 'svelte-i18n'

  export let title = '';
  export let body;
  export let post = null;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="//fonts.googleapis.com/css?family=Karla|Merriweather:400,700,900" />
</svelte:head>

<div class="px-10">
  <input
    type="text"
    bind:value={title}
    placeholder="{$_('editor.title')}"
    class="w-full outline-none border-0 bg-transparent font-serif text-5xl
    text-gray-800 placeholder-gray-600" />
</div>
<QuillEditor bind:body />
