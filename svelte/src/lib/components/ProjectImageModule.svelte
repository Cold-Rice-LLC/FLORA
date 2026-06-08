<script>
	import Image from '$lib/components/Image.svelte';
	import Portable from '$lib/components/Portable.svelte';

	let { module, stageOrder, imageIndex, onImageClick } = $props();

	let landscape = $derived(() => {
		const d = module.image?.asset?.metadata?.dimensions;
		if (!d) return true;
		return d.width >= d.height;
	});

	let imgCols = $derived(landscape() ? 4 : 3);
	let captionCols = $derived(landscape() ? 5 : 4);
</script>

<div class="flex flex-col gap-sm">
	<div class="grid grid-cols-8 gap-sm">
		<div class="col-span-8 lg:col-span-{imgCols}">
			<span class="text-xs font-secondary">[{stageOrder}.{imageIndex}]</span>
			{#if module.image?.asset}
				<button class="image-btn" onclick={onImageClick}>
					<Image item={module.image} />
				</button>
			{/if}
		</div>
	</div>
	{#if module.captionEs || module.captionEn}
		<div class="grid grid-cols-8 gap-sm">
			<div class="col-span-8 lg:col-span-{captionCols} text-xs font-secondary">
				{#if module.captionEs}
					<div class="rich-text"><Portable value={module.captionEs} /></div>
				{/if}
				{#if module.captionEn}
					<div class="rich-text"><Portable value={module.captionEn} /></div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.image-btn {
		display: block;
		width: 100%;
		cursor: pointer;
		outline: none;
	}
</style>
