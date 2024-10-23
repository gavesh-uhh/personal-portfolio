<script lang="ts">
	export let lectureInfo: Lecture;
	type Lecture = {
		class: string | null;
		branch: string | null;
		floor: string | null;
		lecturer: string | null;
		time: string | null;
		on_going: boolean;
		date: Date;
	};
</script>

<div class="relative p-4 bg-background-secondary ring-1 ring-stone-800 rounded-lg">
	{#if lectureInfo.on_going}
		<div class="grad"></div>
	{/if}
	<h1 class="text-muted text-xs">{lectureInfo.branch}</h1>
	<div class="flex flex-row justify-between items-center">
		<h1 class="text-md sm:text-xl">{lectureInfo.class}</h1>
		{#if lectureInfo.lecturer !== 'EXAM'}
			<h1 class="text-muted-foreground text-xs text-right">by {lectureInfo.lecturer}</h1>
		{:else}
			<h1 class="text-yellow-500">{lectureInfo.lecturer}</h1>
		{/if}
	</div>
  <h1 class="text-muted text-xs">@ Floor {lectureInfo.floor}</h1>
	<div class="flex flex-wrap gap-2">
		<h1 class="text-muted-foreground">{lectureInfo.time}</h1>
		{#if lectureInfo.on_going}
			<span class="text-green-400">(On Going)</span>
		{/if}
	</div>
	<div class="flex flex-wrap gap-2">
		<h1 class="text-muted-foreground text-xs opacity-50">{lectureInfo.date.toDateString()}</h1>
	</div>
</div>

<style>
	.grad {
		@apply rounded-lg;
		position: absolute;
		left: 0;
		opacity: 25%;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgb(37, 162, 29);
		background: linear-gradient(0deg, rgba(37, 162, 29, 1) 0%, rgba(255, 255, 255, 0) 95%);
	}
</style>
