<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import slugify from 'slugify';
  import { _ } from 'svelte-i18n';
  import QuillEditor from './QuillEditor.svelte';
  import SeoModal from './SeoModal.svelte';

  export let title = '';
  export let slug = '';
  export let body = '<p>Hello World</p><p><br></p><p><br></p>';
  export let meta = {};
  export let editor;

  const dispatch = createEventDispatcher();

  let isSeoModalOpen = false;

  $: generatedSlug = slug ? slug : slugify(title, { lower: true });

  const listeners = [];
  const imagesToDelete = new Set();

  async function publish() {
    if (!generatedSlug) return;

    dispatch('save');
  }

  function observeForImageDeletion() {
    const callback = mutations => {
      mutations
        .flatMap(mutation => mutation.removedNodes)
        .map(removedNodes => {
          [...removedNodes]
            .map(el => el.querySelector('img'))
            .filter(Boolean)
            .map(img => img.src)
            .filter(url => new URL(url).host === location.host)
            .forEach(url => {
              imagesToDelete.add(url);
            });
        });

      mutations
        .flatMap(mutation => mutation.addedNodes)
        .map(addedNodes => {
          [...addedNodes]
            .map(el => el.querySelector('img'))
            .filter(Boolean)
            .map(img => img.src)
            .filter(url => new URL(url).host === location.host)
            .forEach(url => {
              imagesToDelete.delete(url);
            });
        });
    };

    const elementsObserver = new MutationObserver(callback);
    elementsObserver.observe(editor.root, { childList: true });

    listeners.push(() => elementsObserver.disconnect());
  }

  onMount(() => {
    observeForImageDeletion();
  });

  onDestroy(() => {
    while (listeners.length > 0) {
      listeners.pop()();
    }
  });
</script>

<div class="px-10 py-5">
  <button
    on:click={publish}
    class="btn border border-blue-500 text-blue-500 hover:bg-blue-500
    hover:text-white">
    {$_('editor.publish')}
  </button>
</div>
<div class="px-10">
  <input
    type="text"
    on:input={e => (slug = slugify(e.target.value, { lower: true }))}
    value={slug}
    placeholder={generatedSlug || 'slug'}
    class="input italic text-gray-700 placeholder-gray-400" />
</div>
<div class="px-10">
  <input
    type="text"
    bind:value={title}
    placeholder={$_('editor.title')}
    class="input text-5xl text-gray-800 placeholder-gray-600" />
</div>
<QuillEditor bind:body bind:editor />
<SeoModal bind:open={isSeoModalOpen} bind:meta />
