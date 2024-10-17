<script lang="ts">
	export let data: Lecture;
	type Lecture = {
		class: string | null;
		branch: string | null;
		floor: string | null;
		lecturer: string | null;
		time: string | null;
		on_going: boolean;
	};
</script>

<div class="p-4 bg-background-secondary ring-1 ring-stone-800 rounded-lg">
	<h1 class="text-muted text-xs">{data.branch}</h1>
	<div class="flex flex-row justify-between items-center">
		<h1 class="text-md sm:text-xl">{data.class}</h1>
		{#if data.lecturer !== 'EXAM'}
			<h1 class="text-muted-foreground text-xs text-right">by {data.lecturer}</h1>
		{:else}
			<h1 class="text-yellow-500">{data.lecturer}</h1>
		{/if}
	</div>
	<div class="flex flex-wrap gap-2">
		<h1 class="text-muted-foreground">{data.time}</h1>
		{#if data.on_going}
			<span class="text-green-400">(On Going)</span>
		{/if}
	</div>
</div>
