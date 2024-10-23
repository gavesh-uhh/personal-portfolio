<script>
	import { page } from '$app/stores';
	import { Home, BookOpen, Link, Sparkles, Microchip } from 'lucide-svelte';

	$: currRoute = $page.url.pathname;
</script>

<div class="py-5 flex flex-wrap gap-2">
	<a
		aria-current={currRoute === '/' ? 'page' : null}
		href="/"
		class="link flex items-center flex-row gap-2 rounded-xl p-3 text-muted-foreground w-fit"
	>
		<Home class="w-4 h-4" />
		Home
	</a>
	<a
		aria-current={currRoute === '/experience' ? 'page' : null}
		href="/experience"
		class="link flex items-center flex-row gap-2 rounded-xl p-3 text-muted-foreground w-fit"
	>
		<BookOpen class="w-4 h-4" />
		Experience
	</a>
	<a
		aria-current={currRoute === '/stack' ? 'page' : null}
		href="/stack"
		class="link flex items-center flex-row gap-2 rounded-xl p-3 text-muted-foreground w-fit"
	>
		<Microchip class="w-4 h-4" />
		Stack
	</a>
	<a
		aria-current={currRoute === '/ai' ? 'page' : null}
		href="/ai"
		class="link flex items-center flex-row gap-2 rounded-xl p-3 text-muted-foreground w-fit"
	>
		<Sparkles class="w-4 h-4" />
		AI
	</a>

	<a
		aria-current={currRoute === '/links' ? 'page' : null}
		href="/links"
		class="link flex items-center flex-row gap-2 rounded-xl p-3 text-muted-foreground w-fit"
	>
		<Link class="w-4 h-4" />
		Links
	</a>
</div>

<style>
	a {
		min-width: 40px;
		max-height: 40px;
		transition-duration: 300ms;
		transition-property: opacity font-weight;
		opacity: 75%;
		border-left: 2px solid var(--border);
		border-right: 2px solid var(--border);
	}

	a:hover {
		@apply bg-border;
	}

	a[aria-current='page'] {
		opacity: 100%;
		@apply bg-background-secondary;
		@apply text-foreground;
		@apply font-semibold;
		border-left: 2px solid #ffffff50;
		border-right: 2px solid #ffffff50;
	}
</style>
