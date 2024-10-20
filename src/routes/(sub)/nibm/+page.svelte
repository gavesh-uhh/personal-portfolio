<script lang="ts">
	import LectureData from './(component)/LectureData.svelte';
	export let data;

	$: selectedBranch = '';
	let inputBranch: string;

	const updateTable = async () => {
		selectedBranch = inputBranch;
	};

	const manual = (batch: string) => {
		inputBranch = batch;
		selectedBranch = batch;
	};
</script>

<svelte:head>
	<title>NIBM Lecture Explorer</title>
	<meta name="title" content="NIBM Lecturer Explorer" />
	<meta name="description" content="Sort through today's lectures" />
	<meta name="keywords" content="nibm" />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="4 days" />
	<meta name="author" content="Gavesh Saparamadu" />
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
			placeholder="Type Your Batch Here.."
			class="search-bar"
			type="text"
		/>
	</div>
	<div class="flex opacity-50 hover:opacity-100 transition duration-300 my-4 gap-2 flex-wrap">
		<h1>Tags</h1>
		<div>
			<button
				class="quick-batch"
				on:click={() => {
					manual('DSE24.2F');
				}}>DSE24.2F</button
			>
		</div>
	</div>

	<div class="mt-2 flex flex-col flex-1 gap-2">
		{#if data.today.length > 0}
			{#each data.today as item}
				{#if selectedBranch === ''}
					<LectureData data={item} />
				{:else if item.branch?.startsWith(selectedBranch)}
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
	.quick-batch {
		@apply bg-white rounded-lg text-black px-2;
	}
</style>
