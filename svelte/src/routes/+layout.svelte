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
</main>
