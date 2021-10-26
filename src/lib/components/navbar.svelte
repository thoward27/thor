<script lang="ts">
	import { username } from '$lib/stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { IGunChainReference } from 'gun/types/chain';

	// Whether the extended menu is shown on mobile.
	let menu = false;

	let user: IGunChainReference;
	onMount(async () => {
		user = (await import('$lib/db')).user;
	});

	function logout() {
		user.leave();
		username.set('');
	}
</script>

<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<img
				src="https://avatars.dicebear.com/api/croodles-neutral/thorfitness.svg"
				width="28"
				height="28"
				alt="logo"
			/>
			Thor Fitness
		</a>

		<button
			role="button"
			class:is-active={menu}
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar"
			on:click={() => (menu = !menu)}
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	</div>

	<div id="navbar" class:is-active={menu} class="navbar-menu">
		<div class="navbar-start">
			<a href="/" class="navbar-item" class:is-active={$page.path.startsWith('/workout')}>
				Workout
			</a>

			<!-- TODO: <a href="/history" class="navbar-item" class:is-active={$page.path.startsWith('/history')}>
				History
			</a> -->
		</div>

		<div class="navbar-end">
			{#if $username}
				<div class="navbar-item has-dropdown is-hoverable is-vcentered mr-3">
					<p class="navbar-link is-hidden-touch">
						<figure class="image">
							<img
								src="https://avatars.dicebear.com/api/identicon/{username}.svg"
								alt="user icon"
								class="is-rounded is-24x24"
							/>
						</figure>
					</p>

					<div class="navbar-dropdown is-right">
						<a
							href="/settings"
							class="navbar-item"
							class:is-active={$page.path.startsWith('/settings')}
						>
							Settings
						</a>
						<hr class="navbar-divider" />
						<a
							href="/data/export"
							class="navbar-item"
							class:is-active={$page.path.startsWith('/data/export')}
						>
							Export Data
						</a>
						<a
							href="/data/import"
							class="navbar-item"
							class:is-active={$page.path.startsWith('/data/import')}
						>
							Import Data
						</a>
						<hr class="navbar-divider" />
						<a href="/about" class="navbar-item" class:is-active={$page.path.startsWith('/about')}>
							About
						</a>
						<hr class="navbar-divider" />
						<a href="/help" class="navbar-item" class:is-active={$page.path.startsWith('/help')}>
							Help
						</a>
						<hr class="navbar-divider" />
						<!-- svelte-ignore a11y-missing-attribute -->
						<a role="button" class="navbar-item" on:click={logout}>Sign out</a>
					</div>
				</div>
			{:else}
				<div class="navbar-item">
					<div class="buttons">
						<a href="/auth/signin" class="button is-light"> Sign in </a>
						<a href="/auth/signup" class="button is-primary">
							<strong>Sign up</strong>
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	img.is-rounded {
		border: 1pt solid black;
	}
</style>
