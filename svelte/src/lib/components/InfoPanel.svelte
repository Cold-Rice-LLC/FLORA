<script>
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';

	// props
	let { children, href } = $props();

	// derived
	let isBackground = $derived($page.url.pathname !== href);
</script>

<section id="index-info-panel" style={isBackground ? 'overflow-y: hidden' : ''}>
	<Nav id="info-nav" class="p-xs" />

	{#if isBackground}
		<a href={href} class="panel-overlay">
			<span class="sr-only">Close panel</span>
		</a>
	{/if}

	<div class="p-xs">
		{@render children?.()}
	</div>
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
		overscroll-behavior: none;
		scrollbar-width: none;
	}

	.panel-overlay {
		position: absolute;
		inset: 0;
		z-index: 100;
		cursor: pointer;
	}

	:global(#info-nav) {
		position: sticky;
		top: 0px;
	}
</style>
