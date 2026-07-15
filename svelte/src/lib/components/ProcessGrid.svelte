<script>
	import ProcessGridItem from '$lib/components/ProcessGridItem.svelte';

	let { items, params = '' } = $props();
</script>

<div class="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-x-sm gap-y-base">
	{#each items as item (`${item.project._id}:${item.phase._key}:${item.media._key}`)}
		<ProcessGridItem {item} {params} />
	{/each}
</div>
