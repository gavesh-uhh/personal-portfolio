<script lang="ts">
	import { Mail, Download, Coffee } from 'lucide-svelte';

	const copyEmail = async () => {
		navigator.clipboard.writeText('gaveshasaparamadu06@gmail.com');
		alert('Email Copied to Clipboard');
	};
</script>

<div class="flex flex-col gap-7">
	<div>
		<h1 class="text-muted-foreground text-sm">About Me</h1>
		<p class="">
			18-year-old student with an avid love for Tech, Software, Aeronautics and Minimalism.
		</p>
	</div>

	<div>
		<h1 class="text-muted-foreground text-sm">Skillset Overview</h1>
		<p class="">- Specializes in Java, C#, C++</p>
		<p class="">- Generalist, Full-Stack</p>
	</div>

	<div class="transition-all duration-500">
		<h1 class="text-muted-foreground text-sm">Contact & Info</h1>
		<div class="flex flex-col">
			<div class="py-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<h1
					class="flex flex-row items-center gap-2 cursor-pointer hover:underline"
					on:click={copyEmail}
				>
					<Mail class="w-4 h-4" />
					Mail (Click to Copy)
				</h1>
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
					<i class="devicon-linkedin-plain colored"></i>
					LinkedIn</a
				>
				<a
					href="https://www.instagram.com/gavesh.uhh/"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<img
						src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-1581910.png?f=webp&w=256"
						class="w-4 h-4"
						alt="Instagram Logo"
					/>
					Instagram</a
				>

				<a
					href="https://buymeacoffee.com/gaveshsaparamadu"
					class="underline-offset-0 hover:underline flex flex-row gap-2 w-fit h-fit items-center"
				>
					<Coffee class="w-4 h-4" />
					Buy a Coffee</a
				>
			</div>
		</div>
	</div>
	<div class="opacity-35 hover:opacity-100 transition duration-300 ease-out">
		<h1 class="text-muted-foreground text-sm">Misc</h1>
		<p class="mt-0">
			Have more questions about me? Try
			<a class="bg-yellow-600 px-4 py-1 ml-1 rounded-lg" href="/ai">My AI</a>
		</p>
	</div>
</div>

<style></style>
