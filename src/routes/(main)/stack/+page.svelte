<script>
	import Tech from './(components)/Tech.svelte';
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-muted-foreground text-sm">Specialization</h1>
		<div class="mt-4 flex flex-wrap gap-2">
			<Tech name={'Java'} img={'java'} />
			<Tech name={'C#'} img={'csharp'} />
			<Tech name={'C++'} img={'cplusplus'} />
			<Tech name={'TypeScript'} img={'typescript'} />
			<Tech name={'Node JS'} img={'nodejs'} />
		</div>
	</div>
	<div>
		<h1 class="text-muted-foreground text-sm">Other Tools</h1>
		<div class="mt-4 flex flex-wrap gap-2">
			<Tech name={'Git'} img={'git'} />
			<Tech name={'Neovim'} img={'neovim'} />
		</div>
	</div>
</div>
