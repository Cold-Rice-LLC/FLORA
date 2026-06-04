<script>
	import { page } from '$app/stores';
	import InfoPanel from '$lib/components/InfoPanel.svelte';

	// props
	let { children, data } = $props();

	// derived
	let view = $derived($page.url.searchParams.get('view') || 'process');
	let order = $derived($page.url.searchParams.get('order') || 'newest');
	let search = $derived($page.url.searchParams.get('search') || '');
	let activeStage = $derived($page.url.searchParams.get('stage') || null);

	// helpers
	function stageHref(stage) {
		const params = new URLSearchParams({ view: 'process' });
		if (activeStage !== String(stage.order)) params.set('stage', stage.order);
		return `/index?${params.toString()}`;
	}
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

					<div class="search-forms col-span-2">
						<form>
							<input type="text" placeholder="Buscar">
						</form>

						<form>
							<input type="text" placeholder="Search">
						</form>
					</div>
				</div>
			{/if}
		</div>

		<div class="projects"></div>
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
