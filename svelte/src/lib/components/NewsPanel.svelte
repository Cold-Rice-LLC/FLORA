<script>
	import { format, parseISO } from 'date-fns';
	import { page } from '$app/stores';

	let { children, data } = $props();

	let formattedDate = $derived(
		data?.news?.date ? format(parseISO(data.news.date), 'M.d.yy') : null
	);

	let closeHref = $derived($page.url.pathname.startsWith('/information') ? '/information' : '/');
</script>

<section id="news-detail-panel" class="p-sm space-y-xl">
	<div class="news-detail-header flex justify-between items-start font-secondary text-xs-minus lg:text-xs">
		<div>
			{#if formattedDate || data?.news?.time}
				<p>
					{#if formattedDate}<span>{formattedDate}</span>{/if}
					{#if data?.news?.time}<span> {data.news.time}</span>{/if}
				</p>
			{/if}
			{#if data?.news?.eyebrow}<p>{data.news.eyebrow}</p>{/if}
			{#if data?.news?.title}<p>{data.news.title}</p>{/if}
			{#if data?.news?.subtitle}<p>{data.news.subtitle}</p>{/if}
		</div>

		<a href={closeHref} data-sveltekit-noscroll>Cerrar / Close</a>
	</div>

	{@render children?.()}
</section>

<style>
	#news-detail-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-sm) * 2));
		height: calc(100svh - (var(--spacing-sm) * 24));
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-grey-1);
		z-index: 300;
		overflow-y: auto;
		overscroll-behavior: none;
		scrollbar-width: none;

		@media (min-width: 1024px) {
			width: calc(100% - (var(--spacing-lg) * 8));
			height: calc(100svh - (var(--spacing-lg) * 6));
		}
	}

	.news-detail-header {
		position: sticky;
		top: 0px;
	}
</style>
