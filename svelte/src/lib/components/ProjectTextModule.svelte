<script>
	import Portable from '$lib/components/Portable.svelte';

	let { module } = $props();
</script>

<div class="grid grid-cols-8 gap-sm text-md font-secondary">
	<div class="col-span-8 space-y-[1lh]">
		{#if module.textEs}
			<div class="rich-text"><Portable value={module.textEs} /></div>
		{/if}
		{#if module.textEn}
			<div class="rich-text"><Portable value={module.textEn} /></div>
		{/if}
	</div>
</div>
