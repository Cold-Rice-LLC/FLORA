<script>
	import { page } from '$app/stores';
	import Fuse from 'fuse.js';
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

	// fuse instance — rebuilds when projects change
	let fuse = $derived(
		new Fuse(data.projects ?? [], {
			keys: ['title'],
			threshold: 0.4,
			ignoreLocation: true,
		})
	);

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
				const results = fuse.search(searchValue);
				return results.some((r) => r.item._id === p._id);
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
	<div class="pt-[150px]">
		<div class="filters grid grid-cols-8 gap-sm">
			<div class="col-span-2 text-xs font-secondary">
				<div class="flex gap-1">
					<p>Vista:</p>

					<div>
						<a href="/index" class={view === 'process' ? 'active' : ''}>Proceso</a><span>,</span>
						<a href="/index?view=projects" class={view === 'projects' ? 'active' : ''}>Proyectos</a>
					</div>
				</div>

				<div class="flex gap-1">
					<p>View:</p>
					
					<div>
						<a href="/index" class={view === 'process' ? 'active' : ''}>Process</a><span>,</span>
						<a href="/index?view=projects" class={view === 'projects' ? 'active' : ''}>Projects</a>
					</div>
				</div>
			</div>

			{#if view === 'process'}
				<div class="project-stages col-span-6 text-xs font-secondary">
					<div class="flex gap-1">
						<p>Filtrar:</p>
						<div>
							{#each data.stages as stage, i (stage._id)}
								<a href={stageHref(stage)} class={activeStage === String(stage.order) ? 'active' : ''}>[{stage.order}] {stage.titleEs}</a>{#if i < data.stages.length - 1}<span>,&nbsp;</span> {/if}
							{/each}
						</div>
					</div>
					<div class="flex gap-1">
						<p>Filter:</p>
						<div>
							{#each data.stages as stage, i (stage._id)}
								<a href={stageHref(stage)} class={activeStage === String(stage.order) ? 'active' : ''}>[{stage.order}] {stage.titleEn}</a>{#if i < data.stages.length - 1}<span>,&nbsp;</span> {/if}
							{/each}
						</div>
					</div>
				</div>
			{:else if view === 'projects'}
				<div class="projects-filters col-span-6 text-xs font-secondary grid grid-cols-6 gap-sm">
					<div class="col-span-2">
						<div class="flex gap-1">
							<p>Ordenar por:</p>
							
							<div>
								<a href="/index?view=projects&order=newest" class={order === 'newest' ? 'active' : ''}>Recientes</a><span>,</span>
								<a href="/index?view=projects&order=oldest" class={order === 'oldest' ? 'active' : ''}>Antiguos</a>
							</div>
						</div>

						<div class="flex gap-1">
							<p>Sort:</p>
							
							<div>
								<a href="/index?view=projects&order=newest" class={order === 'newest' ? 'active' : ''}>Newest</a><span>,</span>
								<a href="/index?view=projects&order=oldest" class={order === 'oldest' ? 'active' : ''}>Oldest</a>
							</div>
						</div>
					</div>

					<div class="search-forms col-span-2 flex flex-col items-start">
						<input type="text" placeholder="Buscar" bind:value={searchValue} />
						<input type="text" placeholder="Search" bind:value={searchValue} />
					</div>
				</div>
			{/if}
		</div>

		<div class="projects mt-base">
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
			text-decoration-thickness: var(--underline-thickness-alt);
			text-underline-offset: var(--underline-offset);
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
