<script>
	import '../styles/index.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { format, parseISO } from 'date-fns';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Image from '$lib/components/Image.svelte';

	// props
	let { children, data } = $props();

	let isBackground = $derived($page.url.pathname !== '/');

	// Vars
	let loadingTimeout;

	// configure nprogress
	NProgress.configure({ showSpinner: false });

	// handle navigation
	beforeNavigate(() => {
		loadingTimeout = setTimeout(() => NProgress.start(), 200);
		// NProgress.start();
	});

	afterNavigate(() => {
		clearTimeout(loadingTimeout);
		// NProgress.done();
	});
</script>

<svelte:head>
	<title>FLORA</title>
</svelte:head>

<Nav id="main-nav" class="fixed top-0 left-0 w-full py-base px-lg" />

<main>
	{#if isBackground}
		<a href="/" class="home-overlay">
			<span class="sr-only">Go to home</span>
		</a>
	{/if}

	<!-- Home page content — always rendered so it stays visible behind panels -->
	<div class="featured-projects">
		<div class="featured-projects-inner">
			{#each data.featuredProjects as project (project._id)}
				<a href="/projects/{project.slug.current}" class="featured-project">
					{#if project.featuredImage?.asset}
						{@const dims = project.featuredImage.asset.metadata?.dimensions}
						<div
							class="featured-project-image"
							style={dims ? `aspect-ratio: ${dims.width} / ${dims.height}` : ''}
						>
							<Image item={project.featuredImage} />
						</div>
					{/if}
					<div class="featured-project-meta flex-none text-xs font-secondary flex gap-xl p-sm">
						<div class="flex gap-md">
							{#if project.projectNumber}<span>{project.projectNumber}</span>{/if}
							{#if project.title}<span>{project.title}</span>{/if}
						</div>

						{#if project.date}<span>{format(parseISO(project.date), 'yyyy')}</span>{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>

	{@render children()}
</main>

<style lang="postcss">
.home-overlay {
	position: fixed;
	inset: 0;
	z-index: 50;
	cursor: pointer;
}

.featured-projects {
	position: fixed;
	inset: 0;
	overflow-x: auto;
	overflow-y: hidden;
	scrollbar-width: none;
}

.featured-projects-inner {
	display: flex;
	flex-direction: row;
	height: 100svh;
	padding-left: 500px;
}

.featured-project {
	display: flex;
	flex-direction: column;
	height: 100svh;
	flex-shrink: 0;
}

.featured-project-image {
	flex: 1 1 0;
	min-height: 0;
	height: 100%;
	width: auto;

	:global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

:global(#main-nav nav) {
	padding: var(--spacing-xs);
}
</style>
