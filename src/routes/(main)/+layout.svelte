<script lang="ts">
	import '../../app.css';
	import Canvas from './(components)/Canvas.svelte';
	import Header from './(components)/Header.svelte';
	import Navigation from './(components)/Navigation.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export var data: PageData;
	$: pathname = data.pathname;
</script>

<svelte:head>
	<title>Gavesh Saparamadu</title>
</svelte:head>

<div class="py-12 px-8 sm:p-16 min-h-screen flex flex-col justify-between">
	<div class="z-10">
		<Header />
		<Navigation />
		<hr class="mb-4 mt-0 opacity-15" />
		{#key pathname}
			<div
				class="mt-2 sm:mt-0 flex-grow"
				in:fade={{ duration: 300, delay: 100 }}
				out:fade={{ duration: 100, delay: 50 }}
			>
				<slot />
			</div>
		{/key}
	</div>
	<Canvas />
</div>
