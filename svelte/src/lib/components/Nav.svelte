<script>
	import { page } from '$app/stores';

	let { class: className = '', id = '' } = $props();

	let indexActive = $derived($page.url.pathname.startsWith('/index'));
	let infoActive = $derived($page.url.pathname.startsWith('/information'));
</script>

<header {id} class={className}>
	<nav>
		<ul class="flex flex-col lg:flex-row items-start lg:items-center lg:gap-2 leading-none">
			<a href="/" data-sveltekit-noscroll>FLORA<span class="hidden lg:inline">:</span></a>

			<li class="mt-base lg:mt-0">
				<a href={indexActive ? '/' : '/index'} class={indexActive ? 'active' : ''} data-sveltekit-noscroll>Índice / Index</a><span class="hidden lg:inline">,</span>
			</li>

			<li>
				<a href={infoActive ? '/' : '/information'} class={infoActive ? 'active' : ''} data-sveltekit-noscroll>Información / Information</a>
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
				text-decoration-thickness: var(--underline-thickness);
				text-underline-offset: var(--underline-offset);
			}
		}
	}
</style>
