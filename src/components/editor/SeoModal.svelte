<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Modal from './Modal.svelte';

  export let open = false;
  export let meta = {};
  export let post = {};

  const tempMeta = {
    'og:title': post.title,
    'twitter:title': post.title,
    'twitter:card': 'summary_large_image',
    ...meta,
  };

  const dispatch = createEventDispatcher();

  function handleConfirm() {
    meta = tempMeta;
    open = false;
  }
</script>

<Modal
  title={$_('seo_modal.title')}
  confirmText={$_('seo_modal.confirm')}
  cancelText={$_('seo_modal.cancel')}
  on:confirm={handleConfirm}
  bind:open>

  <div class="py-2">
    <input
      bind:value={tempMeta['description']}
      type="text"
      class="input"
      placeholder="Meta Description" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['canonical']}
      type="text"
      class="input"
      placeholder="Canonical Url" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['og:title']}
      type="text"
      class="input"
      placeholder="Facebook Card Title" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['og:description']}
      type="text"
      class="input"
      placeholder="Facebook Card Description" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['og:image']}
      type="text"
      class="input"
      placeholder="Facebook Card Image" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['og:url']}
      type="text"
      class="input"
      placeholder="Facebook Card Url" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['twitter:title']}
      type="text"
      class="input"
      placeholder="Twitter Card Url" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['twitter:description']}
      type="text"
      class="input"
      placeholder="Twitter Card Description" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['twitter:image']}
      type="text"
      class="input"
      placeholder="Twitter Card Image" />
  </div>

  <div class="py-2">
    <input
      bind:value={tempMeta['twitter:url']}
      type="text"
      class="input"
      placeholder="Twitter Card Url" />
  </div>
</Modal>
