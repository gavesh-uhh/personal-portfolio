<script lang="ts">
	import { Loader2, SearchIcon } from 'lucide-svelte';
	import LectureData from './(component)/LectureData.svelte';
	import { onMount } from 'svelte';

	let lectures: Lecture[] = [];
	let currentDate: Date;
	let loaded = false;

	$: selectedBranch = '';
	$: offset = 0;
	let inputBranch: string;

	const updateTable = async () => {
		selectedBranch = inputBranch;
	};

	const manualUpdate = (batch: string) => {
		inputBranch = batch;
		selectedBranch = batch;
	};

	const setOffset = (num: number) => {
		offset = num;
	};

	onMount(async () => {
		currentDate = new Date();
		console.log(currentDate);
		const response = await fetch('/api/nibm?date=' + currentDate);
		const json = await response.json();
		const data = json.data;
		data.forEach((element: Lecture) => {
			lectures = [...lectures, element];
		});
		loaded = true;
		console.log(lectures);
	});
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
	<div class="flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between">
		<div>
			<h1 class="text-3xl font-semibold">NIBM Lectures Viewer</h1>
			<p class="text-muted-foreground text-sm">⚠️ 'Live Classes' functionality has been removed</p>
		</div>
		<div class="flex flex-row gap-3 items-center">
			<SearchIcon class="w-4 h-4" />
			<input
				bind:value={inputBranch}
				on:input={updateTable}
				placeholder="Type Your Batch Here.."
				class="search-bar"
				type="text"
			/>
		</div>
	</div>

	<hr class="mt-3 mb-1 opacity-10" />

	<div class="flex flex-col gap-4 my-4">
		<div class="flex opacity-100 transition duration-300 gap-2 flex-wrap">
			<h1>Days</h1>
			<div class="flex flex-row gap-1">
				{#each { length: 3 } as _, i}
					<button
						class="quick-batch opacity-45 hover:opacity-100 transition duration-300"
						on:click={() => {
							setOffset(i);
						}}
					>
						{#if i === 0}
							Today
						{:else}
							+{i} Day
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<div class="flex opacity-100 transition duration-300 gap-2 flex-wrap">
			<h1>Tags</h1>
			<div>
				<button
					class="quick-batch opacity-45 hover:opacity-100 transition duration-300"
					on:click={() => {
						manualUpdate('DSE24.2F');
					}}>DSE24.2F</button
				>
				<button
					class="quick-batch opacity-45 hover:opacity-100 transition duration-300"
					on:click={() => {
						manualUpdate('REPEATERS');
					}}>Repeating Exams</button
				>
			</div>
		</div>
	</div>

	<div class="mt-2 flex flex-col flex-1 gap-2">
		{#if loaded}
			{#each lectures as item}
				{#if item.offset == offset}
					{#if selectedBranch == ''}
						<LectureData lectureInfo={item} />
					{:else if item.branch?.startsWith(selectedBranch)}
						<LectureData lectureInfo={item} />
					{/if}
				{/if}
			{/each}
		{:else}
			<div class="flex-1 flex items-start p-4 justify-center">
				<h1 class="flex flex-row gap-4 items-center">
					<Loader2 class="w-4 h-4 animate-spin" />
					Loading Lectures...
				</h1>
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
