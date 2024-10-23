<script lang="ts">
	import { Loader2, SearchIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import LectureData from './(component)/LectureData.svelte';
	import { onMount } from 'svelte';
	export let data;

	$: selectedBranch = '';
	$: offset = 0;
	let inputBranch: string;
	let currentDate = data.date;

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

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			const url = new URL($page.url);
			let classParam = url.searchParams.get('batch') || '';
			let offsetParam = url.searchParams.get('offset') || 0;
			if (classParam != '') {
				manualUpdate(classParam);
			}
			if (offsetParam != null) offset = parseInt(offsetParam.toString());
		});
		return () => {
			unsubscribe();
		};
	});

	function checkForOffset(date1: Date | null, date2: Date | null, offset: number): boolean {
		if (date1 == null || date2 == null) return false;
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate() + offset
		);
	}
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
			<p class="text-muted-foreground text-sm">Type the full batch name (Example - DSE21.3F)</p>
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
						{#if i == 0}
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
		{#await data.today}
			<h1 class="flex flex-row items-center">
				Loading Lectures
				<Loader2 class="ml-2 w-4 h-4 animate-spin" />
			</h1>
		{:then lectures}
			{#if lectures.length > 0}
				{#each lectures as item}
					{#if checkForOffset(item.date, currentDate, offset)}
						{#if selectedBranch === '' || item.branch?.startsWith(selectedBranch)}
							<LectureData lectureInfo={item} />
						{/if}
					{/if}
				{/each}
			{:else}
				<div class="flex-1 flex items-center justify-center">
					<h1>No Lectures Today!</h1>
				</div>
			{/if}
		{/await}
	</div>
	<div class="mt-2">
		<p class="text-muted-foreground text-xs">
			Fetched Time : {data.date.toLocaleDateString() + ' - ' + data.date.toLocaleTimeString()} <br>
		</p>
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
