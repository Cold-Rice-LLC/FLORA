<script>
	import ImageModule from '$lib/components/ImageModule.svelte';
	import TextModule from '$lib/components/TextModule.svelte';

	let { data } = $props();
</script>

<article class="modules space-y-xl">
	{#each data.news.modules as module (module._key)}
		{#if module._type === 'imageModule'}
			<ImageModule {module} />
		{:else if module._type === 'textModule'}
			<TextModule {module} />
		{/if}
	{/each}
</article>
