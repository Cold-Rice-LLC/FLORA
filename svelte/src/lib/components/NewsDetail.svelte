<script>
	import Portable from '$lib/components/Portable.svelte';

	let { data } = $props();
</script>

<article>
	{#if data.news?.modules}
		<div class="modules">
			{#each data.news.modules as module}
				{#if module._type === 'textModule'}
					{#if module.textEs}
						<div class="rich-text">
							<Portable value={module.textEs} />
						</div>
					{/if}
					{#if module.textEn}
						<div class="rich-text">
							<Portable value={module.textEn} />
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}
</article>
