<script>
	import ProcessGridItem from '$lib/components/ProcessGridItem.svelte';

	let { items, params = '' } = $props();
</script>

<div class="grid grid-cols-3 lg:grid-cols-8 gap-sm">
	{#each items as item (item.phase._key)}
		<ProcessGridItem {item} {params} />
	{/each}
</div>
