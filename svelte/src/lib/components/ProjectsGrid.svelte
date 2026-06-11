<script>
	import ProjectGridItem from '$lib/components/ProjectGridItem.svelte';

	let { projects, params = '' } = $props();
</script>

<div class="grid grid-cols-2 lg:grid-cols-4 gap-x-sm gap-y-base">
	{#each projects as project (project._id)}
		<ProjectGridItem {project} {params} />
	{/each}
</div>
