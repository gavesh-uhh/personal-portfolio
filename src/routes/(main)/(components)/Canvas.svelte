<script lang="ts">
	import { onMount } from 'svelte';

	let boxObject: HTMLElement;
	let mouseX = 0;
	let mouseY = 0;
	let currentX = 0;
	let currentY = 0;

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

	function handleTouchMove(event: TouchEvent) {
		mouseX = event.touches[0].clientX;
		mouseY = event.touches[0].clientY;
	}

	function lerp(start: number, end: number, t: number) {
		return start + (end - start) * t;
	}

	function animate() {
		currentX = lerp(currentX, mouseX - 75, 0.1);
		currentY = lerp(currentY, mouseY - 75, 0.1);
		if (boxObject && boxObject.style) {
			boxObject.style.left = `${currentX}px`;
			boxObject.style.top = `${currentY}px`;
		}
		requestAnimationFrame(animate);
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('touchmove', handleTouchMove);
		animate();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('touchmove', handleTouchMove);
		};
	});
</script>

<div class="motion-reduce:hidden absolute w-full left-0 top-0 h-screen">
	<div id="object" bind:this={boxObject}></div>
</div>

<style>
	#object {
		transition: all 0.2s ease;
		position: absolute;
		width: 150px;
		height: 150px;
		left: -350px;
		top: -350px;
		opacity: 45%;
		border-radius: 50%;
		filter: blur(55px);
		background-color: seagreen;
	}
</style>
