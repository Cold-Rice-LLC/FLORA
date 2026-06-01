<script>
	let { children } = $props();
</script>

<section id="index-detail-panel">
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
		overflow-y: auto;
	}
</style>
