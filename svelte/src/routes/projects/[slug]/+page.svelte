<script>
	import DetailPanel from '$lib/components/DetailPanel.svelte';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import { page } from '$app/stores';

	let { data } = $props();

	let canonical = $derived(`${$page.url.origin}/index/${data.slug}`);
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
</svelte:head>

<DetailPanel>
	<ProjectDetail {data} />
</DetailPanel>
