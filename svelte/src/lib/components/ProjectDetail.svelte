<script>
	import Portable from '$lib/components/Portable.svelte';
	import ProjectImageModule from '$lib/components/ProjectImageModule.svelte';
	import ProjectTextModule from '$lib/components/ProjectTextModule.svelte';
	import ProjectCarousel from '$lib/components/ProjectCarousel.svelte';

	let { data } = $props();

	// Flatten all image modules across all phases into a single array
	let allImages = $derived(
		(data.project?.phases ?? []).flatMap((phase) =>
			(phase.modules ?? [])
				.filter((m) => m._type === 'imageModule' && m.image?.asset)
				.map((m) => m.image)
		)
	);

	// Global index tracker for carousel — -1 means closed
	let carouselIndex = $state(-1);

	function getImageModules(modules) {
		return modules?.filter((m) => m._type === 'imageModule') ?? [];
	}

	// Get the global index of an image module across all phases
	function getGlobalIndex(phase, module) {
		let count = 0;
		for (const p of (data.project?.phases ?? [])) {
			for (const m of (p.modules ?? [])) {
				if (m._type === 'imageModule' && m.image?.asset) {
					if (m._key === module._key) return count;
					count++;
				}
			}
		}
		return 0;
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
					{@const globalIndex = getGlobalIndex(phase, module)}
					<ProjectImageModule
						{module}
						stageOrder={phase.category?.order}
						{imageIndex}
						onImageClick={() => (carouselIndex = globalIndex)}
					/>
				{:else if module._type === 'textModule'}
					<ProjectTextModule {module} />
				{/if}
			{/each}
		</section>
	{/each}
</div>

<ProjectCarousel images={allImages} bind:activeIndex={carouselIndex} />
