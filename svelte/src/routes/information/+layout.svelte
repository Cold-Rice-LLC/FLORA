<script>
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import NewsItem from '$lib/components/NewsItem.svelte';
	import Portable from '$lib/components/Portable.svelte';

	// props
	let { children, data } = $props();
</script>

<InfoPanel href="/information">
	<!-- Information content goes here (loaded via +layout.js) -->
	<div class="grid grid-cols-6 lg:grid-cols-8 gap-[50px] lg:gap-sm pt-[100px] lg:pt-[150px]">
		<div class="order-2 lg:order-1 col-span-6 lg:col-span-2 space-y-[1lh]">
			<h2 class="text-xs-minus lg:text-xs font-secondary">Noticias / News</h2>

			{#if data.news.length > 0}
				<div class="news-items space-y-[1lh]">
					{#each data.news as newsItem (newsItem._id)}
						<NewsItem news={newsItem} />
					{/each}
				</div>
			{:else}
				<div class="text-xs-minus lg:text-xs font-secondary">No news items found</div>
			{/if}
		</div>

		<div class="order-1 lg:order-2 col-span-6 lg:col-span-4 lg:col-start-5 text-xs-minus lg:text-xs font-secondary">
			<div class="information-text space-y-[50px] lg:space-y-[100px]">
				{#if data.informationPage?.infoTextEs}
					<div class="rich-text">
						<Portable value={data.informationPage?.infoTextEs} />
					</div>
				{/if}

				{#if data.informationPage?.infoTextEn}
					<div class="rich-text">
						<Portable value={data.informationPage?.infoTextEn} />
					</div>
				{/if}
			</div>
		</div>
	</div>
</InfoPanel>

{@render children()}

<style>
	.information-text {
		position: sticky;
		top: 0px;
	}
</style>
