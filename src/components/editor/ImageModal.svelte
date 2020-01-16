<script>
  import Modal from './Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  export let open = false;

  const dispatch = createEventDispatcher();

  let imageBlob = null;

  let caption = '';

  let inputElement;
  let inputValue = null;
  let inputOldValue = null;

  const fileReader = new FileReader();

  fileReader.onload = () => (imageBlob = fileReader.result);

  $: {
    if (inputValue && inputValue !== inputOldValue) {
      inputOldValue = inputValue;
      fileReader.readAsDataURL(inputElement.files[0]);
    }
  }

  function sendImage() {
    dispatch('confirm', { data: imageBlob, caption });
  }
</script>

<Modal
  bind:open
  title={$_('image_modal.title')}
  confirmText={$_('image_modal.confirm')}
  cancelText={$_('image_modal.cancel')}
  on:confirm={sendImage}>
  <label for="image" class="flex">
    <span class="underline cursor-pointer">{$_('image_modal.body')}</span>
    <input
      bind:this={inputElement}
      type="file"
      id="image"
      class="hidden"
      bind:value={inputValue} />
  </label>
  <div class="p-2">
    {#if imageBlob}
      <div>
        <img src={imageBlob} alt="uploaded image" />
      </div>

      <div class="py-2">
        <input
          class="input text-gray-800 placeholder-gray-600"
          placeholder={$_('image_modal.caption')}
          bind:value={caption} />
      </div>
    {/if}
  </div>
</Modal>
