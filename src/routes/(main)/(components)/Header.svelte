<script lang="ts">
	import { onMount } from 'svelte';
	import DefaultSong from '$lib/assets/default-song.webp';

	import DefaultProfile from '$lib/assets/default-profile.webp';

	import { MapPin } from 'lucide-svelte';

	let GITHUB_PROFILE_URL: string = DefaultProfile;
	let SPOTIFY_TRACK: string;
	let SPOTIFY_ARTIST: string;
	let SPOTIFY_ALBUM: string;
	let SPOTIFY_IMAGE: string;
	let isOnline: boolean = false;

	onMount(async () => {
		await updateProfilePicture();
		await updateSpotify();
		setInterval(async () => {
			await updateSpotify();
		}, 1000);
	});

	async function updateProfilePicture() {
		try {
			const response = await fetch('https://api.github.com/users/gavesh-uhh');
			const data = await response.json();
			GITHUB_PROFILE_URL = data.avatar_url;
		} catch (error) {
			GITHUB_PROFILE_URL = DefaultProfile;
		}
	}

	async function updateSpotify() {
		try {
			const response = await fetch('/api/lastfm');
			if (!response.ok) {
				throw new Error('Failed to fetch Spotify data.');
			}

			const data: LastFMResponse = await response.json();
			if (data.online && data.recent) {
				SPOTIFY_TRACK = data.recent.track;
				SPOTIFY_ARTIST = data.recent.artist;
				SPOTIFY_ALBUM = data.recent.album;
				SPOTIFY_IMAGE = data.recent.image;
				isOnline = true;
			} else {
				isOnline = false;
			}
		} catch (err) {
			isOnline = false;
		}
	}

	interface LastFMResponse {
		online: boolean;
		recent: {
			track: string;
			artist: string;
			album: string;
			image: string;
		};
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col sm:flex-row gap-5 sm:gap-12">
		<div class="flex gap-5 items-center flex-row">
			<img
				loading="eager"
				class="size-[80px] rounded-lg transition-all duration-300"
				src={GITHUB_PROFILE_URL}
				alt="GitHub Avatar"
			/>
			<div class="select-none">
				<h1 class="text-4xl">Gavesh</h1>
				<h1 class="text-2xl">Saparamadu</h1>
			</div>
		</div>
		<div class="flex gap-4 items-center flex-row">
			<img
				loading="lazy"
				title={SPOTIFY_ALBUM}
				class="size-[50px] rounded-md"
				src={isOnline ? SPOTIFY_IMAGE : DefaultSong}
				alt={isOnline ? SPOTIFY_ALBUM : 'Album Cover for Default Picture'}
			/>
			<div>
				{#if isOnline}
					<h1 class="font-semibold text-sm sm:text-md">
						<span class="text-xs text-muted-foreground">Listening </span>
						{SPOTIFY_TRACK}
					</h1>
					<h1 class="text-xs text-muted-foreground">by {SPOTIFY_ARTIST}</h1>
				{:else}
					<h1 class="font-semibold">Not Listening</h1>
					<h1 class="text-xs text-muted-foreground">to anything</h1>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex flex-row gap-4">
		<h1 class="flex flex-wrap items-center text-muted-foreground gap-1">
			<MapPin class="w-4 h-4" /> Colombo, Sri Lanka
		</h1>
	</div>
</div>
