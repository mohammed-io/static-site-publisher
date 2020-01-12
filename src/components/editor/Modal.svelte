<script>
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let title = 'Title';
  export let closeOnEsc = true;
  export let confirmClasses = 'bg-blue-500 hover:bg-blue-600 text-white';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';

  const dispatch = createEventDispatcher();

  $: open && dispatch('open');

  function handleEsc(e) {
    if (e.key !== 'Escape') return;
    closeModal();
  }

  function closeModal() {
    open = false;
    dispatch('close');
  }

  function handleConfirm() {
    dispatch('confirm');
  }
</script>

<style>
  .modal {
    transition: opacity 0.25s ease;
  }
  :global(body.modal-active) {
    overflow-x: hidden;
    overflow-y: visible !important;
  }
</style>

<svelte:window on:keypress={handleEsc} />
<svelte:body class:modal-active={open} />
<div
  class:opacity-0={!open}
  class:pointer-events-none={!open}
  class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center
  justify-center">
  <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

  <div
    class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded
    shadow-lg z-50 overflow-y-auto">

    <button
      on:click={closeModal}
      class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col
      items-center mt-4 mr-4 text-white text-sm z-50">
      <svg
        class="fill-current text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18">
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47
          1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
      </svg>
      <span class="text-sm">(Esc)</span>
    </button>

    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="modal-content py-4 text-left px-6">
      <!--Title-->
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl font-bold">{title}</p>
        <button class="modal-close cursor-pointer z-50" on:click={closeModal}>
          <svg
            class="fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18">
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47
              4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </button>
      </div>

      <slot>
        <p>Modal content can go here</p>
        <p>...</p>
        <p>...</p>
        <p>...</p>
        <p>...</p>
      </slot>

    </div>

    <!--Footer-->
    <div class="flex flex-1">
      <slot name="footer">
        <div class="flex flex-1 items-center justify-end px-1 py-2 bg-gray-200">
          <button
            class="btn hover:bg-gray-100 mx-1"
            on:click={closeModal}>
            {cancelText}
          </button>
          <button
            class="btn mx-1 {confirmClasses}"
            on:click={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </slot>
    </div>
  </div>
</div>
