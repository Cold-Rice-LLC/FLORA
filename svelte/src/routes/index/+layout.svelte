<script>
	import { page } from '$app/stores';
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import ProcessGrid from '$lib/components/ProcessGrid.svelte';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';

	// props
	let { children, data } = $props();

	// derived
	let view = $derived($page.url.searchParams.get('view') || 'process');
	let order = $derived($page.url.searchParams.get('order') || 'newest');
	let search = $derived($page.url.searchParams.get('search') || '');
	let activeStage = $derived($page.url.searchParams.get('stage') || null);

	// search state
	let searchValue = $state('');

	// helpers
	function stageHref(stage) {
		const params = new URLSearchParams({ view: 'process' });
		if (activeStage !== String(stage.order)) params.set('stage', stage.order);
		return `/index?${params.toString()}`;
	}

	// process grid items — flatten phases, filter to those with images, sort by lastUpdated
	let processItems = $derived(
		(data.projects ?? [])
			.flatMap((project) =>
				(project.phases ?? [])
					.filter((phase) =>
						phase.modules?.some((m) => m._type === 'imageModule' && m.image?.asset)
					)
					.map((phase) => ({ project, phase }))
			)
			.filter((item) =>
				activeStage ? String(item.phase.category?.order) === activeStage : true
			)
			.sort((a, b) => {
				if (!a.phase.lastUpdated) return 1;
				if (!b.phase.lastUpdated) return -1;
				return new Date(b.phase.lastUpdated) - new Date(a.phase.lastUpdated);
			})
	);

	// projects grid — filter by search, sort by date
	let filteredProjects = $derived(
		(data.projects ?? [])
			.filter((p) => {
				if (!searchValue) return true;
				const q = searchValue.toLowerCase();
				const titleMatch = p.title?.toLowerCase().includes(q);
				const numberMatch = p.projectNumber != null && String(p.projectNumber).includes(q);
				return titleMatch || numberMatch;
			})
			.sort((a, b) => {
				if (!a.date) return 1;
				if (!b.date) return -1;
				return order === 'oldest'
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date);
			})
	);
</script>

<InfoPanel href="/index">
	<!-- Index list content goes here (loaded via +layout.js) -->
	<div class="pt-[100px] lg:pt-[150px]">
		<div class="filters grid grid-cols-6 xl:grid-cols-8 gap-sm">
			<div class="col-span-2 text-xs-minus lg:text-xs font-secondary space-y-[1lh] lg:space-y-0">
				<div class="flex flex-col lg:flex-row lg:gap-1">
					<p>Vista:</p>

					<div>
						<a href="/index" class={view === 'process' ? 'active' : ''}>Proceso</a><span>,</span>
						<a href="/index?view=projects" class={view === 'projects' ? 'active' : ''}>Proyectos</a>
					</div>
				</div>

				<div class="flex flex-col lg:flex-row lg:gap-1">
					<p>View:</p>
					
					<div>
						<a href="/index" class={view === 'process' ? 'active' : ''}>Process</a><span>,</span>
						<a href="/index?view=projects" class={view === 'projects' ? 'active' : ''}>Projects</a>
					</div>
				</div>
			</div>

			{#if view === 'process'}
				<div class="project-stages col-span-4 xl:col-span-6 text-xs-minus lg:text-xs font-secondary space-y-[1lh] lg:space-y-0">
					<div class="flex md:block flex-col items-start">
						<span>Filtrar:</span>
						{#each data.stages as stage, i (stage._id)}
							<a href={stageHref(stage)} class:active={activeStage === String(stage.order)} class="inline-flex gap-2 lg:gap-1"><span class="flex-none">[{stage.order}]</span><span class="flex-1 lg:flex-none">{stage.titleEs}</span></a>{#if i < data.stages.length - 1}<span class="hidden lg:inline">,&nbsp;</span> {/if}
						{/each}
					</div>
					<div class="flex md:block flex-col items-start">
						<span>Filter:</span>
						{#each data.stages as stage, i (stage._id)}
							<a href={stageHref(stage)} class:active={activeStage === String(stage.order)} class="inline-flex gap-2 lg:gap-1"><span class="flex-none">[{stage.order}]</span><span class="flex-1 lg:flex-none">{stage.titleEn}</span></a>{#if i < data.stages.length - 1}<span class="hidden lg:inline">,&nbsp;</span> {/if}
						{/each}
					</div>
				</div>
			{:else if view === 'projects'}
				<div class="projects-filters col-span-4 xl:col-span-6 text-xs-minus lg:text-xs font-secondary grid grid-cols-4 lg:grid-cols-6 gap-sm">
					<div class="col-span-3 xl:col-span-2 space-y-[1lh] lg:space-y-0">
						<div class="flex flex-col lg:flex-row lg:gap-1">
							<p>Ordenar por:</p>
							
							<div>
								<a href="/index?view=projects&order=newest" class={order === 'newest' ? 'active' : ''}>Recientes</a><span>,</span>
								<a href="/index?view=projects&order=oldest" class={order === 'oldest' ? 'active' : ''}>Antiguos</a>
							</div>
						</div>

						<div class="flex flex-col lg:flex-row lg:gap-1">
							<p>Sort:</p>
							
							<div>
								<a href="/index?view=projects&order=newest" class={order === 'newest' ? 'active' : ''}>Newest</a><span>,</span>
								<a href="/index?view=projects&order=oldest" class={order === 'oldest' ? 'active' : ''}>Oldest</a>
							</div>
						</div>
					</div>

					<div class="search-forms col-span-1 xl:col-span-2 flex flex-col items-end lg:items-start">
						<input type="text" placeholder="Buscar" bind:value={searchValue} class="w-full text-right lg:text-left"/>
						<input type="text" placeholder="Search" bind:value={searchValue} class="w-full text-right lg:text-left"/>
					</div>
				</div>
			{/if}
		</div>

		<div class="projects mt-lg">
			{#if view === 'process'}
				<ProcessGrid items={processItems} params={$page.url.search} />
			{:else if view === 'projects'}
				<ProjectsGrid projects={filteredProjects} params={$page.url.search} />
			{/if}
		</div>
	</div>
</InfoPanel>

{@render children()}

<style lang="postcss">
	.filters,
	.projects-filters {
		a.active {
			text-decoration: underline;
			text-decoration-thickness: var(--underline-thickness);
			text-underline-offset: var(--underline-offset);
			/* Don't break the underline under descenders (y, j, g) — at the smaller
			   mobile font size the line sits close enough to trigger skip-ink, which
			   reads as a dashed underline. */
			text-decoration-skip-ink: none;
		}
	}

	.search-forms {
		input {
			&::placeholder {
				color: var(--color-black);
			}
		}
	}
</style>
