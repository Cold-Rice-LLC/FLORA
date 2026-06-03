<script>
	import NewsPanel from '$lib/components/NewsPanel.svelte';
	import NewsDetail from '$lib/components/NewsDetail.svelte';
	import { page } from '$app/stores';

	let { data } = $props();

	let canonical = $derived(`${$page.url.origin}/information/${$page.params.slug}`);
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
</svelte:head>

<NewsPanel {data}>
	<NewsDetail {data} />
</NewsPanel>
