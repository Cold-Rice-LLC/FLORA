<script>
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';

	// props
	let { children, href } = $props();

	// derived
	let isBackground = $derived($page.url.pathname !== href);
</script>

<section id="index-info-panel" style={isBackground ? 'overflow-y: hidden' : ''}>
	<Nav id="info-nav" class="p-sm" />

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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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
		/* background: rgb(253 245 231 / 95%); */

		/* &::before {
			content: '';
			position: absolute;
			height: 100px;
			width: 100%;
			bottom: 0px;
			left: 0px;
			transform: translateY(100%);
			background: linear-gradient(
				to bottom,
				rgba(253, 245, 231, 0.95)  0%,
				rgba(253, 245, 231, 0.987) 8.1%,
				rgba(253, 245, 231, 0.951) 15.5%,
				rgba(253, 245, 231, 0.896) 22.5%,
				rgba(253, 245, 231, 0.825) 29%,
				rgba(253, 245, 231, 0.741) 35.3%,
				rgba(253, 245, 231, 0.648) 41.2%,
				rgba(253, 245, 231, 0.55)  47.1%,
				rgba(253, 245, 231, 0.45)  52.9%,
				rgba(253, 245, 231, 0.352) 58.8%,
				rgba(253, 245, 231, 0.259) 64.7%,
				rgba(253, 245, 231, 0.175) 71%,
				rgba(253, 245, 231, 0.104) 77.5%,
				rgba(253, 245, 231, 0.049) 84.5%,
				rgba(253, 245, 231, 0.013) 91.9%,
				rgba(253, 245, 231, 0)     100%
			);
			z-index: -1;
		} */
	}
</style>
