<script>
	let { children } = $props();
</script>

<section id="index-info-panel">
	{@render children?.()}
</section>

<style>
	#index-info-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-lg) * 2));
		height: calc(100svh - (var(--spacing-base) * 2));
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-tan);
		z-index: 100;
		overflow-y: auto;
	}
</style>
