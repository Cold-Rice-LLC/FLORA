<script>
	import Portable from '$lib/components/Portable.svelte';

	let { module } = $props();
</script>

<section class="grid grid-cols-6 gap-base text-sm font-secondary">
	<div class="col-span-3">
		{#if module.textEs}
			<div class="rich-text">
				<Portable value={module.textEs} />
			</div>
		{/if}
	</div>
	<div class="col-span-3">
		{#if module.textEn}
			<div class="rich-text">
				<Portable value={module.textEn} />
			</div>
		{/if}
	</div>
</section>
