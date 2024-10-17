<script>
	import { ArrowLeft } from 'lucide-svelte';
	import '../../app.css';
</script>

<div class="p-4 sm:p-8 min-h-screen flex flex-col">
	<a class="flex flex-row items-center gap-2 w-fit p-2" href="/">
		<ArrowLeft class="w-4 h-4 mr-2" /> Back to Home</a
	>
	<hr class="mt-2 mb-4 opacity-20" />
	<slot />
</div>

<style>
	a {
		color: white;
		transition: background 100ms linear;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
