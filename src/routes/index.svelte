<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<svelte:head>
  <title>@MoAbdulkereem</title>
</svelte:head>

<style>
  .animate-arrow {
    animation-name: animate-updown;
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  @keyframes animate-updown {
    0% {
      margin-bottom: 0;
      margin-top: 0;
    }

    50% {
      margin-bottom: -.3em;
      margin-top: .3em;
    }

    99% {
      margin-bottom: -.01em;
      margin-top: .01em;
    }
  }
</style>

<div class="h-screen text-white flex flex-1 font-mono" style="background: #101010">
  <div class="flex flex-1 flex-col justify-between">
    <header class="uppercase">
      <slot name="nav">
        <Nav {segment} />
      </slot>
    </header>
    <section>
      <div class="px-2 sm:px-10 lg:px-16">
        <div>
          <h1 class="text-2xl sm:text-4xl text-black px-2 bg-white inline-block">
            Mohammed Abdulkereem
          </h1>
        </div>
        <div>
          <h2 class="text-lg sm:text-xl text-black px-2 bg-white inline-block my-1">
            Software Craftsman
          </h2>
        </div>
      </div>
    </section>
    <section>
      <div class="flex py-2 items-center justify-center flex-col">
        <a href="#">
          <span>Who am I?</span>
          <div class="flex justify-center h-6">
            <svg class="flex-1 animate-arrow" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </a>
      </div>
    </section>
  </div>
</div>
