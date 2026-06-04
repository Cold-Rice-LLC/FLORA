<script>
	import { onMount } from 'svelte';
	import Image from '$lib/components/Image.svelte';
	import Swiper from 'swiper';
	import 'swiper/swiper-bundle.css';
	import { portal } from '$lib/actions/portal.js';

	let { images, activeIndex = $bindable(-1) } = $props();

	let swiperEl = $state(null);
	let swiperApi = $state(null);
	let isTouchDevice = $state(false);

	let startX = $state(null);
	let startY = $state(null);
	const threshold = 2;

	let isActive = $derived(activeIndex >= 0);

	onMount(() => {
		isTouchDevice = 'ontouchstart' in window;

		swiperApi = new Swiper(swiperEl, {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			speed: isTouchDevice ? 300 : 0,
			allowTouchMove: isTouchDevice,
		});
	});

	// When activeIndex changes from outside, jump to that slide
	$effect(() => {
		if (swiperApi && activeIndex >= 0) {
			swiperApi.slideToLoop(activeIndex, 0);
		}
	});

	$effect(() => {
		document.body.style.overflow = isActive ? 'hidden' : '';
	});

	function onKeyDown(e) {
		if (!isActive) return;
		if (e.key === 'ArrowRight') swiperApi?.slideNext();
		else if (e.key === 'ArrowLeft') swiperApi?.slidePrev();
		else if (e.key === 'Escape') activeIndex = -1;
	}

	function onMouseDown(e) {
		if (isTouchDevice) return;
		startX = e.clientX;
		startY = e.clientY;
	}

	function onMouseUp(e) {
		if (isTouchDevice) return;
		const deltaX = e.clientX - startX;
		const deltaY = e.clientY - startY;
		if (Math.abs(deltaX) <= threshold && Math.abs(deltaY) <= threshold) {
			activeIndex = -1;
		}
	}

	function onTouchStart(e) {
		if (!isTouchDevice) return;
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	}

	function onTouchEnd(e) {
		if (!isTouchDevice) return;
		const deltaX = e.changedTouches[0].clientX - startX;
		const deltaY = e.changedTouches[0].clientY - startY;
		if (Math.abs(deltaX) <= threshold && Math.abs(deltaY) <= threshold) {
			activeIndex = -1;
		}
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<div
	use:portal
	class="carousel"
	class:active={isActive}
	onmousedown={onMouseDown}
	onmouseup={onMouseUp}
	ontouchstart={onTouchStart}
	ontouchend={onTouchEnd}
	aria-modal="true"
	aria-hidden={!isActive}
	role="dialog"
>
	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each images as image}
				<div class="swiper-slide">
					<Image item={image} fetchWidth={2400} loading="eager" />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.carousel {
		position: fixed;
		inset: 0;
		z-index: 500;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s;
		cursor: pointer;
	}

	.carousel.active {
		opacity: 1;
		pointer-events: auto;
	}

	.swiper {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	:global(.carousel .swiper-slide) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xs);
		cursor: pointer;
	}

	:global(.carousel .swiper-slide img) {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}
</style>
