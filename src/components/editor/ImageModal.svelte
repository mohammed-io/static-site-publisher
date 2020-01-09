<script>
  import Modal from './Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  export let open = true;

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
    dispatch('confirm', { url: imageBlob, caption });
  }
</script>

<Modal bind:open title="Upload Image" on:confirm={sendImage}>
  <label for="image">
    <span class="underline cursor-pointer">Choose image to new upload</span>
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
          class="w-full outline-none border-0 bg-transparent font-serif
          text-gray-800 placeholder-gray-600"
          placeholder="Image caption (optional)"
          bind:value={caption} />
      </div>
    {/if}
  </div>
</Modal>
