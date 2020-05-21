<script>
	export let segment;
</script>

<!-- <nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>home</a></li>
		<li><a class:selected='{segment === "about"}' href='about'>about</a></li>

		<li><a rel=prefetch class:selected='{segment === "blog"}' href='blog'>blog</a></li>
	</ul>
</nav> -->

<nav class="justify-center list-none py-3 hidden sm:flex">
	<li class="py-1 md:px-4">
		<a href="/">Home</a>
	</li>

	<span class="border-l-2 my-1 sm:mx-3"></span>

	<li class="py-1 md:px-4">
		<a href="/under_construction">Projects</a>
	</li>

	<span class="border-l-2 my-1 sm:mx-3"></span>

	<li class="py-1 md:px-4">
		<a href="/under_construction">Contact</a>
	</li>

	<span class="border-l-2 my-1 sm:mx-3"></span>

	<li class="py-1 md:px-4">
		<a href="/under_construction">Blog</a>
	</li>
</nav>