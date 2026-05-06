<script>
	import { urlFor } from '$lib/sanity/client';

	let { imageUrl, alt, classes, width = 2600 } = $props();

	const src = $derived(urlFor(imageUrl).width(width).url());

	let loaded = $state(false);
	const classList = $derived([classes, loaded ? 'loaded' : ''].filter(Boolean).join(' '));
</script>

<img
	{src}
	{alt}
	class={classList}
	loading="lazy"
	onload={() => {
		loaded = true;
	}}
	onerror={() => {
		loaded = true;
	}}
/>
