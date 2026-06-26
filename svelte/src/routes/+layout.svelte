<script>
	import '../styles/index.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate, goto } from '$app/navigation';
	import { format, parseISO } from 'date-fns';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Image from '$lib/components/Image.svelte';
	import Video from '$lib/components/Video.svelte';

	// props
	let { children, data } = $props();

	let isBackground = $derived($page.url.pathname !== '/');

	// Lock page scrolling while a panel is open so the home page can't scroll behind it.
	// Target the root scroll container (<html>) rather than <body>: it freezes the page in
	// place without losing the scroll offset, and combined with the panels' own
	// `overscroll-behavior: none` it stops touch-scroll from chaining through to the home layer.
	$effect(() => {
		document.documentElement.style.overflow = isBackground ? 'hidden' : '';
	});

	// Page meta — routes return a `meta` object via their load fn; fall back to defaults.
	let meta = $derived($page.data.meta ?? { title: 'FLORA' });

	// Global Escape — closes the topmost visible layer
	function onKeyDown(e) {
		if (e.key !== 'Escape') return;
		// Carousel handles its own Escape; don't double-navigate
		if (document.querySelector('.carousel.active')) return;

		const { pathname, search } = $page.url;
		if (pathname.startsWith('/information/') || pathname.startsWith('/news/')) {
			goto('/information');
		} else if (pathname.startsWith('/index/')) {
			goto(`/index${search}`);
		} else if (pathname.startsWith('/projects/')) {
			goto('/');
		} else if (pathname !== '/') {
			// /index or /information base — InfoPanel is the top layer
			goto('/');
		}
	}

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
		NProgress.done();
	});

	// Redirect vertical wheel scrolling into horizontal scrolling on the home strip.
	function wheelToHorizontal(node) {
		// Desktop only — matches the `lg` (1024px) breakpoint. Re-evaluated on
		// breakpoint change rather than on every wheel event.
		const desktop = window.matchMedia('(min-width: 1024px)');
		let isDesktop = desktop.matches;
		const onBreakpoint = (e) => (isDesktop = e.matches);
		desktop.addEventListener('change', onBreakpoint);

		function onWheel(e) {
			if (!isDesktop) return;
			// Only the home view hijacks the wheel; panels scroll vertically as normal.
			if ($page.url.pathname !== '/') return;
			// Nothing to scroll horizontally — leave the event alone.
			if (node.scrollWidth <= node.clientWidth) return;
			// Firefox mouse wheels report deltas in lines (deltaMode 1), not pixels;
			// scale those up so a notch moves a comparable distance across browsers.
			const scale = e.deltaMode === 1 ? 16 : 1;
			node.scrollLeft += (e.deltaY + e.deltaX) * scale;
			e.preventDefault();
		}
		node.addEventListener('wheel', onWheel, { passive: false });

		return {
			destroy() {
				node.removeEventListener('wheel', onWheel);
				desktop.removeEventListener('change', onBreakpoint);
			}
		};
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<svelte:head>
	<title>{meta.title}</title>
	<meta property="og:title" content={meta.title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content={meta.image ? 'summary_large_image' : 'summary'} />
	{#if meta.description}
		<meta name="description" content={meta.description} />
		<meta property="og:description" content={meta.description} />
		<meta name="twitter:description" content={meta.description} />
	{/if}
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
		<meta name="twitter:image" content={meta.image} />
	{/if}
</svelte:head>

<Nav id="main-nav" class="fixed top-0 left-0 w-full py-sm px-base lg:px-lg" />

<main>
	{#if isBackground}
		<a href="/" class="home-overlay" data-sveltekit-noscroll>
			<span class="sr-only">Go to home</span>
		</a>
	{/if}

	<!-- Home page content — always rendered so it stays visible behind panels -->
	<div class="featured-projects pb-base lg:pb-0" use:wheelToHorizontal>
		<div class="featured-projects-inner hidden lg:flex">
			{#each data.featuredProjects as project (project._id)}
				<div class="featured-project">
					{#if project.featuredVideo?.asset}
						<div class="featured-project-image aspect-video relative">
							<Video item={project.featuredVideo} poster={project.featuredImage} />
						</div>
					{:else if project.featuredImage?.asset}
						{@const dims = project.featuredImage.asset.metadata?.dimensions}
						<div
							class="featured-project-image"
							style={dims ? `aspect-ratio: ${dims.width} / ${dims.height}` : ''}
						>
							<Image item={project.featuredImage} />
						</div>
					{/if}
					
					<a href="/projects/{project.slug.current}" class="featured-project-meta flex-none text-xs-minus lg:text-xs font-secondary flex gap-base lg:gap-[16vw] p-sm" data-sveltekit-noscroll>
						<div class="flex gap-sm lg:gap-[3.2vw]">
							{#if project.projectNumber}<span>{project.projectNumber}</span>{/if}
							{#if project.title}<span>{project.title}</span>{/if}
						</div>

						{#if project.date}<span>{format(parseISO(project.date), 'yyyy')}</span>{/if}
					</a>
				</div>
			{/each}
		</div>

		<div class="featured-projects-inner flex lg:hidden">
			{#each data.featuredProjects as project (project._id)}
				<a href="/projects/{project.slug.current}" class="featured-project" data-sveltekit-noscroll>
					{#if project.featuredVideo?.asset}
						<div class="featured-project-image aspect-video relative">
							<Video item={project.featuredVideo} poster={project.featuredImage} />
						</div>
					{:else if project.featuredImage?.asset}
						{@const dims = project.featuredImage.asset.metadata?.dimensions}
						<div
							class="featured-project-image"
							style={dims ? `aspect-ratio: ${dims.width} / ${dims.height}` : ''}
						>
							<Image item={project.featuredImage} />
						</div>
					{/if}
					
					<div class="featured-project-meta flex-none text-xs-minus lg:text-xs font-secondary flex gap-base lg:gap-[16vw] py-sm px-xs" data-sveltekit-noscroll>
						<div class="flex gap-sm lg:gap-[3.2vw]">
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
	scrollbar-width: none;
	padding-top: 103px;

	@media (min-width: 1024px) {
		overflow-x: auto;
		overflow-y: hidden;
		position: fixed;
		inset: 0;
		padding-top: 0px;
	}
}

.featured-projects-inner {
	flex-direction: column;
	height: auto;
	
	@media (min-width: 1024px) {
		padding-left: 517px;
		flex-direction: row;
		height: 100svh;
	}
}

.featured-project {
	display: flex;
	flex-direction: column;
	height: auto;
	width: 100%;
	flex-shrink: 0;

	@media (min-width: 1024px) {
		height: 100svh;
		width: auto;
	}
}

.featured-project-image {
	min-height: 0;
	height: auto;
	width: 100%;

	@media (min-width: 1024px) {
		flex: 1 1 0;
		height: 100%;
		width: auto;
	}

	:global(figure) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		aspect-ratio: auto;
	}

	:global(img),
	:global(video) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

:global(#main-nav nav) {
	padding: 0.55rem var(--spacing-sm);

	@media (min-width: 1024px) {
		padding: 0.65rem var(--spacing-sm);
	}
}
</style>
