<script>
	import DetailPanel from '$lib/components/DetailPanel.svelte';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';

	let { data } = $props();
</script>

<DetailPanel>
	<ProjectDetail {data} />
</DetailPanel>
