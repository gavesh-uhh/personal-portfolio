<script lang="ts">
	export let name: string;
	export let img: string;
	let cleanStr = img.trim().toLowerCase();
</script>

<div
	class="cursor-default flex flex-row items-center gap-2 ring-1 ring-border px-5 py-3 rounded-lg w-fit"
>
	<img
		alt={img}
		class="w-[30px] h-[30px]"
		src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${cleanStr}/${cleanStr}-original.svg`}
	/>
	<h1>{name}</h1>
</div>
