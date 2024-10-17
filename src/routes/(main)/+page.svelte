<script lang="ts">
	import { Download, Coffee } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-muted-foreground text-sm">About Me</h1>
		<p class="">
			18-year-old student with an avid love for Tech, Software, Aeronautics and Minimalism.
		</p>
	</div>
	<div>
		<h1 class="text-muted-foreground text-sm">Skillset Overview</h1>
		<p class="">Specializes in Java, C#, C++</p>
		<p class="">Generalist, Full-Stack</p>
	</div>

	<div class="transition-all duration-500">
		<h1 class="text-muted-foreground text-sm">Contact & Info</h1>
		<div class="flex flex-col">
			<div class="p-2">
				<a
					href="https://buymeacoffee.com/gaveshsaparamadu"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<Coffee class="w-4 h-4" />
					Buy a Coffee</a
				>

				<a
					href="/"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<Download class="w-4 h-4" />
					Download CV</a
				>

				<a
					href="https://github.com/gavesh-uhh"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<i class="devicon-github-original"></i>
					Github</a
				>
				<a
					href="https://www.linkedin.com/in/gavesh-saparamadu/"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<i class="devicon-linkedin-plain"></i>
					LinkedIn</a
				>
			</div>
		</div>
	</div>
</div>

<style></style>
