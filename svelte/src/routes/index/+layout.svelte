<script>
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	let { children } = $props();
</script>

<InfoPanel>
	<!-- Index list content goes here (loaded via +layout.js) -->
</InfoPanel>

{@render children()}
