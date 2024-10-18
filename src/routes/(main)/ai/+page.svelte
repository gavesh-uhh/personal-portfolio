<script lang="ts">
	import { Search, Loader, AlertTriangle } from 'lucide-svelte';

	let inputValue = '';
	let responseAvailable = true;
	let responseLoading = false;
	let responseData = 'Go ahead and ask me questions!';
	let error = false;

	async function getResponse() {
		if (inputValue.trim().length <= 0 || responseLoading) return;

		responseAvailable = false;
		responseLoading = true;
		error = false;

		try {
			let data = await fetch('/api/llm?query=' + encodeURIComponent(inputValue));
			if (!data.ok) throw new Error('Failed to fetch');
			let response = await data.json();
			responseData = response.content;
		} catch {
			responseData = 'An error occurred. Please try again.';
			error = true;
		} finally {
			responseLoading = false;
			responseAvailable = true;
		}
	}

	function handleKeyDown(event: any) {
		if (event.key === 'Enter') {
			getResponse();
		}
	}
</script>

<div class="flex flex-col gap-4">
	<div>
		<div>
			<h1 class="text-muted-foreground text-sm">AI Helper</h1>
		</div>
		<div class="mt-4 gap-2 rounded-lg flex relative">
			<input
				placeholder={responseLoading ? 'Fetching response...' : 'Ask AI about me'}
				type="text"
				bind:value={inputValue}
				on:keydown={handleKeyDown}
				class="prompt-bar"
				disabled={responseLoading}
			/>
			<button
				on:click={getResponse}
				class="rounded-lg px-2 bg-muted text-muted-foreground w-[45px] flex justify-center items-center opacity-75 hover:opacity-100 transition-all duration-300"
				disabled={responseLoading}
			>
				{#if responseLoading}
					<Loader class="animate-spin" />
				{:else}
					<Search class="w-4 h-4" />
				{/if}
			</button>
		</div>
	</div>
	<div
		class={`p-4 bg-background border border-muted rounded-lg shadow-md transition-all duration-500 ${!responseAvailable ? 'blur-sm' : ''}`}
	>
		<h1
			class={`text-xs transition-all duration-300 ${error ? 'text-red-500' : 'text-muted-foreground'}`}
		>
			Generated Response,
		</h1>
		<p class="text-lg mt-2 transition-all duration-300 text-foreground">
			{responseData}
		</p>
	</div>
	<div>
		<p class="text-xs text-muted-foreground">
			Disclaimer - This feature might generate invalid information. Check important info
		</p>
	</div>
</div>

<style>
	.blur {
		filter: blur(10px);
	}

	.prompt-bar {
		@apply rounded-lg;
		background: var(--border);
		border: 2px solid var(--border);
		padding: 8px 16px;
		width: 100%;
		font-size: 16px;
		color: #ffffff;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.prompt-bar::placeholder {
		color: #ffffff50;
	}

	.prompt-bar:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.suggestions-list {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--border);
		border-radius: 0 0 8px 8px;
		border: 2px solid var(--border);
		border-top: none;
		max-height: 150px;
		overflow-y: auto;
		z-index: 10;
	}

	.suggestion-item {
		padding: 10px 16px;
		cursor: pointer;
		color: #ffffff;
		transition: background-color 0.2s ease;
	}

	.suggestion-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
