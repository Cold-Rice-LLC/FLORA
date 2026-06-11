<script>
	import { format, parseISO } from 'date-fns';
	import { page } from '$app/stores';

	let { news } = $props();

	let formattedDate = $derived(
		news.date
			? format(parseISO(news.date), 'M.d.yy')
			: null
	);

	let isActive = $derived($page.url.pathname === `/information/${news.slug.current}`);
</script>

<article class="news-item text-xs-minus lg:text-xs font-secondary" class:opacity-30={isActive}>
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
