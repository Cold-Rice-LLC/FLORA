<script>
	import Video from '$lib/components/Video.svelte';
	import Portable from '$lib/components/Portable.svelte';

	let { module } = $props();
</script>

<section class="grid grid-cols-6 gap-base">
	<div class="col-span-6 lg:col-span-4 lg:col-start-2 flex flex-col items-center text-center gap-sm">
		{#if module.video?.asset}
			<Video item={module.video} poster={module.poster} />
		{/if}

		<div class="space-y-base">
			{#if module.captionEs}
				<div class="rich-text text-xs-minus lg:text-xs font-secondary">
					<Portable value={module.captionEs} />
				</div>
			{/if}
			{#if module.captionEn}
				<div class="rich-text text-xs-minus lg:text-xs font-secondary">
					<Portable value={module.captionEn} />
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	video {
		width: 100%;
	}
</style>