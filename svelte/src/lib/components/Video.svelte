<script>
	import { urlFor } from '$lib/sanity/client.js';

	let { item, poster, classes, preload = 'metadata', autoplay = true, loop = true } = $props();

	const src = $derived(item?.asset?.url);
	const posterUrl = $derived(poster?.asset ? urlFor(poster.asset).width(1800).url() : undefined);

	let el = $state(null);

	// The `muted` attribute doesn't reliably reflect to the property, and autoplay
	// requires the property to be true — set it explicitly.
	$effect(() => {
		if (el) el.muted = true;
	});
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<figure class="aspect-video">
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
	></video>
</figure>

<style>
	/* Videos render in a fixed 16/9 frame by default. Square grid thumbnails and
	   the carousel override this via higher-specificity selectors. */
	video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
