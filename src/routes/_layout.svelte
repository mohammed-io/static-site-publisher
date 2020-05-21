<script context="module">
  import { waitLocale } from 'svelte-i18n';

  export async function preload() {
    return waitLocale();
  }
</script>

<script>
  import '../styles/tailwind.css';
  import Nav from '../components/Nav.svelte';
  import { _ } from 'svelte-i18n';

  export let segment;

  $: isRtl = $_('options.rtl') === 'true';
</script>

<svelte:head>
  {#if isRtl}
    <style>
      html,
      body {
        direction: rtl;
      }
    </style>
  {/if}
</svelte:head>
<Nav {segment} />

<slot />
