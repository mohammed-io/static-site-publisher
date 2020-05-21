<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<svelte:head>
  <title>@MoAbdulkereem</title>
</svelte:head>

<div class="h-screen text-white flex flex-1 font-mono" style="background: #101010">
  <div class="flex flex-1 flex-col justify-between">
    <header class="uppercase">
      <slot name="nav">
        <Nav {segment} />
      </slot>
    </header>
    <section class="mb-20 justify-center">
      <div class="px-2 sm:px-10 lg:px-16">
        <h2 class="text-lg sm:text-xl text-black px-2 bg-white inline-block">
            Under construction!
        </h2>
      </div>
    </section>
    <div class="dull"></div>
  </div>
</div>
