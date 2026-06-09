<script>
	import Image from '$lib/components/Image.svelte';
	import Portable from '$lib/components/Portable.svelte';

	let { module, stageOrder, imageIndex, onImageClick } = $props();

	let landscape = $derived(() => {
		const d = module.image?.asset?.metadata?.dimensions;
		if (!d) return true;
		return d.width >= d.height;
	});

	let imgColsClass = $derived(landscape() ? 'col-span-8 lg:col-span-4' : 'col-span-8 lg:col-span-3');
	let captionColsClass = $derived(landscape() ? 'col-span-8 lg:col-span-5' : 'col-span-8 lg:col-span-4');
</script>

<div class="flex flex-col gap-sm">
	<div class="grid grid-cols-8 gap-sm">
		<div class={imgColsClass}>
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
			<div class="{captionColsClass} text-xs font-secondary">
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
