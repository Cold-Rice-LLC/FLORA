<script>
	import { PortableText } from '@portabletext/svelte';

	const { value } = $props();

	const components = { hardBreak: null };
</script>

<PortableText {value} {components} />
