<script>
	import { format, parseISO } from 'date-fns';
	import Image from '$lib/components/Image.svelte';
	import Video from '$lib/components/Video.svelte';

	let { item, params = '', active = false, onActivate, onClear } = $props();

	// console.log(item)

	// Project year
	let year = $derived(item.project.date ? format(parseISO(item.project.date), 'yyyy') : null);

	// First media module (image or video) across all modules in this phase
	let firstMedia = $derived(
		item.phase.modules?.find(
			(m) =>
				(m._type === 'imageModule' && m.image?.asset) ||
				(m._type === 'videoModule' && m.video?.asset)
		) ?? null
	);

	// Distinguish a tap from a scroll/drag gesture so scrolling doesn't reveal state.
	const MOVE_THRESHOLD = 10;
	let startX = 0;
	let startY = 0;
	let moved = false;

	function onTouchStart(e) {
		const t = e.touches[0];
		startX = t.clientX;
		startY = t.clientY;
		moved = false;
	}

	function onTouchMove(e) {
		const t = e.touches[0];
		if (Math.abs(t.clientX - startX) > MOVE_THRESHOLD || Math.abs(t.clientY - startY) > MOVE_THRESHOLD) {
			moved = true;
		}
	}

	// Double-tap on touch: first tap reveals hover state, second tap navigates.
	function onClick(e) {
		if (!('ontouchstart' in window)) return; // desktop — let it through
		if (moved) {
			e.preventDefault(); // was a scroll, not a tap
			return;
		}
		if (!active) {
			e.preventDefault();
			onActivate?.();
		} else {
			// Second tap navigates — clear so the state isn't active on return.
			onClear?.();
		}
	}
</script>

<a
	href="/index/{item.project.slug.current}{params}"
	class="process-grid-item"
	class:touched={active}
	ontouchstart={onTouchStart}
	ontouchmove={onTouchMove}
	onclick={onClick}
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

	{#if firstMedia?._type === 'videoModule'}
		<div class="image-container inset-0">
			<Video item={firstMedia.video} poster={firstMedia.poster} classes="item-image" />
		</div>
	{:else if firstMedia?._type === 'imageModule'}
		<div class="image-container inset-0">
			<Image item={firstMedia.image} classes="item-image" />
		</div>
	{/if}
</a>

<style>
	.process-grid-item {
		position: relative;
		display: block;
		aspect-ratio: 1;
	}

	.label {
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-0.14em);
		z-index: 10;
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

	.process-grid-item .image-container {
		position: relative;
		width: 100%;
		height: 100%;
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
