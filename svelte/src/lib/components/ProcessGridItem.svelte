<script>
	import { format, parseISO } from 'date-fns';
	import Image from '$lib/components/Image.svelte';

	let { item, params = '' } = $props();

	// console.log(item)

	// Project year
	let year = $derived(item.project.date ? format(parseISO(item.project.date), 'yyyy') : null);

	// First image module across all modules in this phase
	let firstImage = $derived(
		item.phase.modules?.find((m) => m._type === 'imageModule' && m.image?.asset) ?? null
	);

	// Double-tap on touch: first tap reveals hover state, second tap navigates
	let touched = $state(false);

	function onClick(e) {
		if (!('ontouchstart' in window)) return; // desktop — let it through
		if (!touched) {
			e.preventDefault();
			touched = true;
		}
		// second tap: touched is already true, allow default navigation
	}

	function onBlur() {
		touched = false;
	}
</script>

<a
	href="/index/{item.project.slug.current}{params}"
	class="process-grid-item"
	class:touched
	onclick={onClick}
	onblur={onBlur}
>
	<div class="label text-xs-minus lg:text-xs font-secondary">
		<p>{item.project.projectNumber} [{item.phase.category?.order}]</p>

		<div class="hover-content">
			{#if item.project.title}
				<p class="title">{item.project.title}</p>
			{/if}
			{#if year}
				<p class="year">{year}</p>
			{/if}
			{#if item.project.previewText}
				<div class="preview-text">{item.project.previewText}</div>
			{/if}
		</div>
	</div>

	{#if firstImage}
		<div class="image-container inset-0">
			<Image item={firstImage.image} classes="item-image" />
		</div>
	{/if}
</a>

<style>
	.process-grid-item {
		position: relative;
		display: block;
		aspect-ratio: 1;
		overflow: hidden;
	}

	.label {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		transform: translateY(-0.1em);
	}

	.hover-content {
		opacity: 0;
		pointer-events: none;
	}

	.process-grid-item:hover .hover-content,
	.process-grid-item.touched .hover-content {
		opacity: 1;
	}

	.process-grid-item:hover .image-container,
	.process-grid-item.touched .image-container {
		opacity: .5;
	}

	:global(.process-grid-item .item-image) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: right bottom;
	}
</style>
