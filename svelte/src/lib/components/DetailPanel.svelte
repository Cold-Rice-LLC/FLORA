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

<section id="index-detail-panel" class="p-sm">
	<div class="detail-header flex justify-between items-start font-secondary text-xs">
		<div class="flex gap-lg lg:gap-2xl">
			<div class="flex gap-base lg:gap-md">
				{#if data?.project?.projectNumber}<span>{data.project.projectNumber}</span>{/if}
				{#if data?.project?.title}<span>{data.project.title}</span>{/if}
			</div>

			{#if year}<span>{year}</span>{/if}
		</div>

		<a href={closeHref}>Cerrar / Close</a>
	</div>

	{@render children?.()}
</section>

<style>
	#index-detail-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-base) * 4));
		height: 100svh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-white);
		z-index: 200;
		overscroll-behavior: none;
		overflow-y: auto;
		scrollbar-width: none;

		@media (min-width: 1024px) {
			width: calc(100% - (var(--spacing-lg) * 4));
		}
	}

	.detail-header {
		position: sticky;
		top: 0px;
		padding: 0.7rem 0 2.5rem 0;
		z-index: 50;

		@media (min-width: 1024px) {
			padding: 1.7rem 0;
		}
	}
</style>
