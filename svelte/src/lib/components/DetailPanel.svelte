<script>
	import { page } from '$app/stores';

	let { children } = $props();

	let closeHref = $derived($page.url.pathname.startsWith('/index') ? '/index' : '/');
</script>

<section id="index-detail-panel" class="p-sm">
	<div class="flex justify-between items-center font-secondary py-base text-xs">
		<p>Title</p>

		<a href={closeHref}>Cerrar / Close</a>
	</div>

	{@render children?.()}
</section>

<style>
	#index-detail-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-lg) * 4));
		height: 100svh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-white);
		z-index: 200;
		overscroll-behavior: none;
		overflow-y: auto;
		scrollbar-width: none;
	}
</style>
