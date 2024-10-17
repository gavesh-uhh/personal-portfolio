<script lang="ts">
	import { onMount } from 'svelte';
	import LectureData from './(component)/LectureData.svelte';
	export let data;

	$: selectedBranch = '';
	let inputBranch: string;

	onMount(async () => {
		console.log(data.today);
	});

	const updateTable = async () => {
		selectedBranch = inputBranch;
	};
</script>

<svelte:head>
	<title>NIBM Lecture Explorer</title>
</svelte:head>

<div class="h-full flex-1 flex flex-col">
	<div class="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between">
		<div>
			<h1 class="text-3xl font-semibold">NIBM Lectures Viewer</h1>
			<p class="text-muted-foreground">Type the full batch name (Example - DSE21.3F)</p>
		</div>
		<input
			bind:value={inputBranch}
			on:input={updateTable}
			placeholder="Type Your Branch Here"
			class="search-bar"
			type="text"
		/>
	</div>
	<div class="mt-4 flex flex-col flex-1 gap-2">
		{#if data.today.length > 0}
			{#each data.today as item}
				{#if selectedBranch === ''}
					<LectureData data={item} />
				{:else if item.branch === selectedBranch}
					<LectureData data={item} />
				{/if}
			{/each}
		{:else}
			<div class="flex-1 flex items-center justify-center">
				<h1>No Lectures Today!</h1>
			</div>
		{/if}
	</div>
</div>

<style>
	.search-bar {
		@apply bg-background-secondary text-foreground py-2 px-4 rounded-lg;
	}
</style>
