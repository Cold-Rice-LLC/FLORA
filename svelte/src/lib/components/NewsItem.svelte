<script>
	let { news } = $props();

	let formattedDate = $derived(
		news.date
			? new Date(news.date).toLocaleDateString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'})
			: null
	);
</script>

<article class="news-item text-xs font-secondary">
  <a href="/information/{news.slug.current}">
    {#if formattedDate || news.time}
      <p class="date">
        {#if formattedDate}<span>{formattedDate}</span>{/if}
        {#if news.time}<span>{news.time}</span>{/if}
      </p>
    {/if}

    {#if news.eyebrow}
      <div class="eyebrow">{news.eyebrow}</div>
    {/if}

    <h3 class="title">{news.title}</h3>

    {#if news.subtitle}
      <div class="subtitle">{news.subtitle}</div>
    {/if}
  </a>
</article>
