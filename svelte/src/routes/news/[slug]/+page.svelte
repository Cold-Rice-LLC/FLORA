<script>
	import NewsPanel from '$lib/components/NewsPanel.svelte';
	import { page } from '$app/stores';

	let canonical = $derived(`${$page.url.origin}/information/${$page.params.slug}`);
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
</svelte:head>

<NewsPanel>
	<h1>News Detail</h1>
</NewsPanel>
