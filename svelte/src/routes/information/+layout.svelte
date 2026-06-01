<script>
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	let { children } = $props();
</script>

<InfoPanel>
	<!-- Information content goes here (loaded via +layout.js) -->
</InfoPanel>

{@render children()}
