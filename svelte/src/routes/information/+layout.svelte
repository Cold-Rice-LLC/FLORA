<script>
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	let { children } = $props();
</script>

<InfoPanel href="/information">
	<!-- Information content goes here (loaded via +layout.js) -->
	<p>Information</p>

	<a href="/information/news-1">News 1</a>
	<a href="/information/news-2">News 2</a>
	<a href="/information/news-3">News 3</a>
</InfoPanel>

{@render children()}
