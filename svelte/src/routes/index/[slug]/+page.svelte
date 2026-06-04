<script>
	import DetailPanel from '$lib/components/DetailPanel.svelte';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';

	let { data } = $props();
</script>

<DetailPanel {data}>
	<ProjectDetail {data} />
</DetailPanel>
