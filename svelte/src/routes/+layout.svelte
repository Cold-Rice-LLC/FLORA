<script>
	import '../styles/index.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';

	// props
	let { children } = $props();

	let isBackground = $derived($page.url.pathname !== '/');

	// Vars
	let loadingTimeout;

	// configure nprogress
	NProgress.configure({ showSpinner: false });

	// handle navigation
	beforeNavigate(() => {
		// loadingTimeout = setTimeout(() => NProgress.start(), 200);
		NProgress.start();
	});

	afterNavigate(() => {
		// clearTimeout(loadingTimeout);
		NProgress.done();
	});
</script>

<svelte:head>
	<title>FLORA</title>
</svelte:head>

<Nav id="main-nav" class="fixed top-0 left-0 w-full py-base px-lg" />

<main>
	{#if isBackground}
		<a href="/" class="home-overlay">
			<span class="sr-only">Go to home</span>
		</a>
	{/if}

	<!-- Home page content — always rendered so it stays visible behind panels -->
	<h1>Home</h1>

	{@render children()}
</main>

<style lang="postcss">
.home-overlay {
	position: fixed;
	inset: 0;
	z-index: 50;
	cursor: pointer;
}

:global(#main-nav nav) {
	padding: var(--spacing-xs);
}
</style>
