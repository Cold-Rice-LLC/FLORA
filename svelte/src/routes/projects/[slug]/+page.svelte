<script>
	import DetailPanel from '$lib/components/DetailPanel.svelte';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import { page } from '$app/stores';

	let { data } = $props();

	let canonical = $derived(`${$page.url.origin}/index/${data.project?.slug?.current}`);
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
</svelte:head>

<DetailPanel {data}>
	<ProjectDetail {data} />
</DetailPanel>
