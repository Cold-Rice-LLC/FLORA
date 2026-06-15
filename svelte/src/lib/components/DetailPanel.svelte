<script>
	import { format, parseISO } from 'date-fns';
	import { page } from '$app/stores';

	let { children, data } = $props();

	let closeHref = $derived(
		$page.url.pathname.startsWith('/index')
			? `/index${$page.url.search}`
			: '/'
	);

	let year = $derived(data?.project?.date ? format(parseISO(data.project.date), 'yyyy') : null);
</script>

<section id="index-detail-panel">
	<div class="detail-header flex justify-between items-start font-secondary text-xs-minus lg:text-xs gap-base lg:gap-[3.2vw]">
		<div class="flex gap-base lg:gap-[16vw]">
			<div class="flex gap-sm lg:gap-[3.2vw]">
				{#if data?.project?.projectNumber}<span>{data.project.projectNumber}</span>{/if}
				{#if data?.project?.title}<span>{data.project.title}</span>{/if}
			</div>

			{#if year}<span>{year}</span>{/if}
		</div>

		<a href={closeHref} class="flex-none">Cerrar / Close</a>
	</div>

	{@render children?.()}
</section>

<style>
	#index-detail-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-xl) * 2));
		height: 100svh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-white);
		z-index: 200;
		overscroll-behavior: none;
		overflow-y: auto;
		scrollbar-width: none;
		padding: var(--spacing-base);

		@media (min-width: 1024px) {
			width: calc(100% - (var(--spacing-2xl) * 2));
		}
	}

	.detail-header {
		position: sticky;
		top: 0px;
		z-index: 50;
	}

	:global(.detail-header + *) {
		margin-top: var(--spacing-base);
	}
</style>
