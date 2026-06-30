<script>
	import { urlFor } from '$lib/sanity/client.js';

	let {
		item,
		poster,
		classes,
		preload = 'metadata',
		autoplay = true,
		loop = true,
		onmeta
	} = $props();

	const src = $derived(item?.asset?.url);
	const posterUrl = $derived(poster?.asset ? urlFor(poster.asset).width(1800).url() : undefined);

	let el = $state(null);

	// The `muted` attribute doesn't reliably reflect to the property, and autoplay
	// requires the property to be true — set it explicitly.
	$effect(() => {
		if (el) el.muted = true;
	});

	// Sanity doesn't store dimensions for uploaded video files, so report the
	// intrinsic size once the browser has it — lets callers size the frame to the
	// video's real proportions instead of guessing.
	function handleMeta() {
		if (el?.videoWidth && el?.videoHeight) {
			onmeta?.({ width: el.videoWidth, height: el.videoHeight });
		}
	}
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<figure>
	<video
		bind:this={el}
		{src}
		poster={posterUrl}
		class={classes}
		{autoplay}
		muted
		{loop}
		playsinline
		{preload}
		onloadedmetadata={handleMeta}
	></video>
</figure>

<style>
	figure {
		margin: 0;
	}

	/* Videos render at their native proportions by default. Square grid
	   thumbnails, the carousel, and the featured filmstrip override this via
	   higher-specificity selectors. */
	video {
		display: block;
		width: 100%;
		height: auto;
		object-fit: contain;
	}
</style>
