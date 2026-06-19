<script>
	import Video from '$lib/components/Video.svelte';
	import Portable from '$lib/components/Portable.svelte';

	let { module, stageOrder, mediaIndex, onVideoClick } = $props();

	// Videos always render in a 16/9 (landscape) frame.
	const vidColsClass = 'col-span-8 lg:col-span-4';
	const captionColsClass = 'col-span-8 lg:col-span-5';
</script>

<div class="flex flex-col gap-sm">
	<div class="grid grid-cols-8 gap-sm">
		<div class={vidColsClass}>
			<span class="text-xs-minus lg:text-xs font-secondary">[{stageOrder}.{mediaIndex}]</span>
			{#if module.video?.asset}
				<button class="video-btn" onclick={onVideoClick}>
					<Video item={module.video} poster={module.poster} />
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
	.video-btn {
		display: block;
		width: 100%;
		cursor: pointer;
		outline: none;
	}
</style>
