<script>
	import { page } from '$app/stores';

	let { class: className = '', id = '' } = $props();

	let indexActive = $derived($page.url.pathname.startsWith('/index'));
	let infoActive = $derived($page.url.pathname.startsWith('/information'));
</script>

<header {id} class={className}>
	<nav>
		<ul class="flex items-center gap-2">
			<a href="/">FLORA:</a>

			<li>
				<a href="/index" class={indexActive ? 'active' : ''}>Índice / Index</a><span>,</span>
			</li>

			<li>
				<a href="/information" class={infoActive ? 'active' : ''}>Información / Information</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		z-index: 50;
		pointer-events: none;

		a {
			pointer-events: auto;

			&.active {
				text-decoration: underline;
				text-decoration-thickness: .05em;
				text-underline-offset: .13em;
			}
		}
	}
</style>
