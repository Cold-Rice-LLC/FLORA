<script>
	import ProcessGridItem from '$lib/components/ProcessGridItem.svelte';

	let { items, params = '' } = $props();

	// Touch reveal state — only one item may be active at a time.
	let activeKey = $state(null);

	// While an item is active, dismiss it on scroll or on a tap outside the grid.
	$effect(() => {
		if (activeKey === null) return;

		const dismiss = () => (activeKey = null);
		const onPointerDown = (e) => {
			if (!e.target.closest('.process-grid-item')) activeKey = null;
		};

		// Capture phase so we catch scrolling on the InfoPanel container too.
		window.addEventListener('scroll', dismiss, true);
		window.addEventListener('pointerdown', onPointerDown, true);

		return () => {
			window.removeEventListener('scroll', dismiss, true);
			window.removeEventListener('pointerdown', onPointerDown, true);
		};
	});
</script>

<div class="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-x-sm gap-y-base">
	{#each items as item (`${item.project._id}:${item.phase._key}:${item.media._key}`)}
		{@const key = `${item.project._id}:${item.phase._key}:${item.media._key}`}
		<ProcessGridItem
			{item}
			{params}
			active={activeKey === key}
			onActivate={() => (activeKey = key)}
			onClear={() => (activeKey = null)}
		/>
	{/each}
</div>
