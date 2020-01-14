<script>
  import { onMount, onDestroy } from 'svelte';
  import QuillEditor from './QuillEditor.svelte';
  import { _ } from 'svelte-i18n';

  export let title = '';
  export let body =
    '<p>Hello Worl</p><p><br></p><div class="embedded_image" contenteditable="false" data-layout="undefined"><img alt="" src="images/k5bfmpmz.png"></div><p><br></p>';
  export let post = null;

  export let editor;
  const listeners = [];
  const imagesToDelete = new Set();

  async function publish() {
    await fetch('/editor/post.json', {
      body: JSON.stringify({ body, title }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(console.log);
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

    listeners.push(elementsObserver.disconnect);
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
    bind:value={title}
    placeholder={$_('editor.title')}
    class="w-full outline-none border-0 bg-transparent font-serif text-5xl
    text-gray-800 placeholder-gray-600" />
</div>
<QuillEditor bind:body bind:editor />
