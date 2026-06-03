<script>
	let { children } = $props();
</script>

<section id="news-detail-panel">
	<div class="flex justify-between items-center font-secondary p-sm">
		<p>Title</p>

		<a href="/information">Cerrar / Close</a>
	</div>

	{@render children?.()}
</section>

<style>
	#news-detail-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-lg) * 8));
		height: calc(100svh - (var(--spacing-lg) * 6));
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-grey-1);
		z-index: 300;
		overflow-y: auto;
	}
</style>
