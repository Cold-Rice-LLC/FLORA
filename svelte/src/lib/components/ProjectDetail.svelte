<script>
	import Portable from '$lib/components/Portable.svelte';
	import ProjectImageModule from '$lib/components/ProjectImageModule.svelte';
	import ProjectVideoModule from '$lib/components/ProjectVideoModule.svelte';
	import ProjectTextModule from '$lib/components/ProjectTextModule.svelte';
	import ProjectCarousel from '$lib/components/ProjectCarousel.svelte';

	let { data } = $props();

	// A module that carries a viewable asset (image or video).
	const isMediaModule = (m) =>
		(m._type === 'imageModule' && m.image?.asset) ||
		(m._type === 'videoModule' && m.video?.asset);

	// Flatten all media modules across all phases into a single carousel array
	let allMedia = $derived(
		(data.project?.phases ?? []).flatMap((phase) =>
			(phase.modules ?? []).filter(isMediaModule).map((m) =>
				m._type === 'videoModule'
					? { type: 'video', video: m.video, poster: m.poster }
					: { type: 'image', image: m.image }
			)
		)
	);

	// Global index tracker for carousel — -1 means closed
	let carouselIndex = $state(-1);

	function getMediaModules(modules) {
		return modules?.filter(isMediaModule) ?? [];
	}

	// Get the global index of a media module across all phases
	function getGlobalIndex(module) {
		let count = 0;
		for (const p of (data.project?.phases ?? [])) {
			for (const m of (p.modules ?? [])) {
				if (isMediaModule(m)) {
					if (m._key === module._key) return count;
					count++;
				}
			}
		}
		return 0;
	}
</script>

<div class="project-detail space-y-lg lg:space-y-xl">
	{#if data.project?.introduction}
		<section class="grid grid-cols-8 gap-sm">
			<div class="col-span-8 rich-text text-sm lg:text-md font-secondary">
				<Portable value={data.project.introduction} />
			</div>
		</section>
	{/if}

	{#each (data.project?.phases ?? []) as phase (phase._key)}
		<section id="stage-{phase.category?.order}" class="space-y-base">
			{#each (phase.modules ?? []) as module (module._key)}
				{#if module._type === 'imageModule'}
					{@const mediaIndex = getMediaModules(phase.modules).findIndex((m) => m._key === module._key) + 1}
					{@const globalIndex = getGlobalIndex(module)}
					<ProjectImageModule
						{module}
						stageOrder={phase.category?.order}
						imageIndex={mediaIndex}
						onImageClick={() => (carouselIndex = globalIndex)}
					/>
				{:else if module._type === 'videoModule'}
					{@const mediaIndex = getMediaModules(phase.modules).findIndex((m) => m._key === module._key) + 1}
					{@const globalIndex = getGlobalIndex(module)}
					<ProjectVideoModule
						{module}
						stageOrder={phase.category?.order}
						{mediaIndex}
						onVideoClick={() => (carouselIndex = globalIndex)}
					/>
				{:else if module._type === 'textModule'}
					<ProjectTextModule {module} />
				{/if}
			{/each}
		</section>
	{/each}
</div>

<ProjectCarousel media={allMedia} bind:activeIndex={carouselIndex} />
