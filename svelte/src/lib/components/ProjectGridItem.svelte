<script>
	import { format, parseISO } from 'date-fns';
	import Image from '$lib/components/Image.svelte';

	let { project, params = '' } = $props();

	let year = $derived(project.date ? format(parseISO(project.date), 'yyyy') : null);
</script>

<a href="/index/{project.slug.current}{params}" class="project-grid-item">
	<div class="label w-full text-xs-minus lg:text-xs font-secondary grid grid-cols-4 lg:grid-cols-8 gap-sm">
		<div class="col-span-1">
			{#if project.projectNumber}<span>{project.projectNumber}</span>{/if}
		</div>

		<div class="col-span-3 lg:col-span-5">
			{#if project.title}<span>{project.title}</span>{/if}
		</div>

		<div class="col-span-2 hidden lg:block">
			{#if year}<span>{year}</span>{/if}
		</div>
	</div>

	{#if project.featuredImage?.asset}
		<div class="image-container inset-0">
			<Image item={project.featuredImage} classes="item-image" />
		</div>
	{/if}
</a>

<style>
	.project-grid-item {
		position: relative;
		display: block;
		aspect-ratio: 1;
		overflow: hidden;
	}

	.label {
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
	}

	.project-grid-item:hover .image-container {
		@media (min-width: 1024px) {
			opacity: .5;
		}
	}

	:global(.project-grid-item .item-image) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: right bottom;
	}
</style>
