<script lang="ts">
	let testBool = false;
</script>

<!-- im not sure why i added this -->
{#if testBool}
	<div
		class="flex top-0 left-0 items-center justify-center absolute z-20 w-screen h-screen bg-black"
	>
		<h1>blah blah</h1>
	</div>
{/if}
