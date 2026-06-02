<script>
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	let { children } = $props();
</script>

<InfoPanel href="/index">
	<!-- Index list content goes here (loaded via +layout.js) -->
	<p>Index</p>

	<a href="/index/project-1">Project 1</a>
	<a href="/index/project-2">Project 2</a>
	<a href="/index/project-3">Project 3</a>
</InfoPanel>

{@render children()}
