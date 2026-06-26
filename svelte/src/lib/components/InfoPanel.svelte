<script>
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';

	// props
	let { children, href } = $props();

	// derived
	let isBackground = $derived($page.url.pathname !== href);
</script>

<section id="index-info-panel" style={isBackground ? 'overflow-y: hidden' : ''}>
	<Nav id="info-nav" />

	{#if isBackground}
		<a href={href} class="panel-overlay">
			<span class="sr-only">Close panel</span>
		</a>
	{/if}

	<div class="p-sm">
		{@render children?.()}
	</div>
</section>

<style>
	#index-info-panel {
		position: fixed;
		width: calc(100% - (var(--spacing-base) * 2));
		height: calc(100svh - (var(--spacing-sm) * 2));
		/* Anchor the top edge rather than vertically centering: on iOS Safari a
		   `top: 50%` fixed element shifts as the address bar resizes the layout
		   viewport, which drags this panel out of alignment with the fixed home nav.
		   Pinning the top keeps it locked to the same reference frame as that nav. */
		top: var(--spacing-sm);
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--color-tan);
		z-index: 100;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: none;
		scrollbar-width: none;

		@media (min-width: 1024px) {
			width: calc(100% - (var(--spacing-lg) * 2));
			height: calc(100svh - (var(--spacing-sm) * 2));
		}
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
		padding: 0.55rem var(--spacing-sm);

		@media (min-width: 1024px) {
			padding: 0.65rem var(--spacing-sm);
		}
	}
</style>
