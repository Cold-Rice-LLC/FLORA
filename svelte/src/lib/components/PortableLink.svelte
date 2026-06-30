<script>
	const { portableText, children } = $props();

	const href = $derived.by(() => {
		const { href, url, link, value } = portableText.value;
		return href || url || link || value;
	});

	// External = absolute http(s) URL or protocol-relative. Internal/relative
	// links, anchors, mailto: and tel: stay in the same tab.
	const isExternal = $derived(
		typeof href === 'string' && /^(https?:)?\/\//i.test(href)
	);
</script>

{#if typeof href === 'string'}
	<a
		{href}
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}>{@render children?.()}</a>
{:else}
	{@render children?.()}
{/if}
