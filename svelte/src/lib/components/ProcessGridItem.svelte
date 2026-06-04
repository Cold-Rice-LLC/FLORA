<script>
	import Image from '$lib/components/Image.svelte';

	let { item, params = '' } = $props();

	// First image module across all modules in this phase
	let firstImage = $derived(
		item.phase.modules?.find((m) => m._type === 'imageModule' && m.image?.asset) ?? null
	);
</script>

<a href="/index/{item.project.slug.current}{params}" class="process-grid-item">
	<span class="label text-xs font-secondary">
		{item.project.projectNumber} [{item.phase.category?.order}]
	</span>

	{#if firstImage}
		<Image item={firstImage.image} classes="item-image" />
	{/if}
</a>

<style>
	.process-grid-item {
		position: relative;
		display: block;
		aspect-ratio: 1;
		overflow: hidden;
		background-color: var(--color-grey-1);
	}

	.label {
		position: absolute;
		top: var(--spacing-sm);
		left: var(--spacing-sm);
		z-index: 1;
	}

	:global(.process-grid-item .item-image) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: right bottom;
	}
</style>
