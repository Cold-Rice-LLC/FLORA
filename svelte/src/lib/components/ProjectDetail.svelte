<script>
	import Portable from '$lib/components/Portable.svelte';
	import ProjectImageModule from '$lib/components/ProjectImageModule.svelte';
	import ProjectTextModule from '$lib/components/ProjectTextModule.svelte';

	let { data } = $props();

	function getImageModules(modules) {
		return modules?.filter((m) => m._type === 'imageModule') ?? [];
	}
</script>

<div class="project-detail space-y-xl">
	{#if data.project?.introduction}
		<section class="grid grid-cols-8 gap-sm">
			<div class="col-span-8 rich-text text-md font-secondary">
				<Portable value={data.project.introduction} />
			</div>
		</section>
	{/if}

	{#each (data.project?.phases ?? []) as phase (phase._key)}
		<section id="stage-{phase.category?.order}" class="space-y-xl">
			{#each (phase.modules ?? []) as module (module._key)}
				{#if module._type === 'imageModule'}
					{@const imageIndex = getImageModules(phase.modules).findIndex((m) => m._key === module._key) + 1}
					<ProjectImageModule {module} stageOrder={phase.category?.order} {imageIndex} />
				{:else if module._type === 'textModule'}
					<ProjectTextModule {module} />
				{/if}
			{/each}
		</section>
	{/each}
</div>
