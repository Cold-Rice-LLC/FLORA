<script>
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import NewsItem from '$lib/components/NewsItem.svelte';
	import Portable from '$lib/components/Portable.svelte';

	// props
	let { children, data } = $props();
</script>

<InfoPanel href="/information">
	<!-- Information content goes here (loaded via +layout.js) -->
	<div class="grid grid-cols-8 gap-sm pt-[150px]">
		<div class="col-span-2 space-y-base">
			<h2 class="text-xs font-secondary">Noticias / News</h2>

			<div class="news-items space-y-base">
				{#each data.news as newsItem (newsItem._id)}
					<NewsItem news={newsItem} />
				{/each}
			</div>
		</div>

		<div class="col-span-4 col-start-5 text-xs font-secondary">
      <div class="rich-text">Spanish Text</div>

			<div class="rich-text">English Text</div>
		</div>
	</div>
</InfoPanel>

{@render children()}
