<script>
	import { page } from "$app/state";
</script>

<header id="main-nav" class="fixed top-0 left-0 w-full py-base px-lg">
  <nav>
    <ul class="flex items-center gap-2">
      <a href="/">FLORA:</a>

      <li>
        <a href="/index" class={page.url.pathname === '/index' ? 'active' : ''}>Índice / Index</a><span>,</span>
      </li>

      <li>
        <a href="/information" class={page.url.pathname === '/information' ? 'active' : ''}>Información / Information</a>
      </li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  #main-nav {
    z-index: 50;
    
    a {
      &.active {
        text-decoration: underline;
        text-decoration-thickness: .05em;
        text-underline-offset: .13em;
      }
    }
  }
</style>