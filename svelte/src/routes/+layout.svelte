<script>
	import '../styles/global.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import MainNav from '$lib/components/MainNav.svelte';

	// props
	let { children } = $props();

	// Vars
	// let loadingTimeout;

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

<MainNav />

<main>
	{@render children()}

	<section id="index-info-panel"></section>

	<section id="index-detail-panel"></section>

	<section id="news-detail-panel"></section>
</main>

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
