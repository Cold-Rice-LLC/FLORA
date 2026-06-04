<script>
	import { format, parseISO } from 'date-fns';
	import Image from '$lib/components/Image.svelte';

	let { project, params = '' } = $props();

	let year = $derived(project.date ? format(parseISO(project.date), 'yyyy') : null);
</script>

<a href="/index/{project.slug.current}{params}" class="project-grid-item">
	<span class="label text-xs font-secondary flex gap-lg">
		{#if project.projectNumber}<span>{project.projectNumber}</span>{/if}
		{#if project.title}<span>{project.title}</span>{/if}
		{#if year}<span>{year}</span>{/if}
	</span>

	{#if project.featuredImage?.asset}
		<Image item={project.featuredImage} classes="item-image" />
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

	:global(.project-grid-item .item-image) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: right bottom;
	}
</style>
