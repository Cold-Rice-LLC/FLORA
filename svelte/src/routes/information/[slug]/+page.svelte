<script>
	import NewsPanel from '$lib/components/NewsPanel.svelte';
	import NewsDetail from '$lib/components/NewsDetail.svelte';

	let { data } = $props();
</script>

<NewsPanel {data}>
	<NewsDetail {data} />
</NewsPanel>
