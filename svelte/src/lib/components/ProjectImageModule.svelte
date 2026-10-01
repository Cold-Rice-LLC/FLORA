<script>
	import Image from '$lib/components/Image.svelte';
	import Portable from '$lib/components/Portable.svelte';

	let { module, stageOrder, imageIndex, onImageClick } = $props();

	let dims = $derived(module.image?.asset?.metadata?.dimensions);
	let landscape = $derived(!dims || dims.width >= dims.height);

	// Width as a fraction of the shared long edge: 1 for wide images, so their
	// width is the long edge; width/height for tall ones, so their height is.
	let mediaScale = $derived(landscape ? 1 : dims.width / dims.height);

	let captionColsClass = $derived(landscape ? 'col-span-8 lg:col-span-5' : 'col-span-8 lg:col-span-4');
</script>

<div class="flex flex-col gap-sm">
	<div class="grid grid-cols-8 gap-sm">
		<div class="col-span-8 lg:w-[calc(var(--media-long-edge)*var(--media-scale))]" style="--media-scale: {mediaScale}">
			<span class="text-xs-minus lg:text-xs font-secondary">[{stageOrder}.{imageIndex}]</span>
			{#if module.image?.asset}
				<button class="image-btn" onclick={onImageClick}>
					<Image item={module.image} />
				</button>
			{/if}
		</div>
	</div>
	{#if module.captionEs || module.captionEn}
		<div class="grid grid-cols-8 gap-sm">
			<div class="{captionColsClass} text-xs-minus lg:text-xs font-secondary space-y-sm">
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
