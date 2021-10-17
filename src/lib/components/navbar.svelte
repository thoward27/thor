<script lang="ts">
	import { username } from '$lib/stores';
	import { onMount } from 'svelte';

	let user;
	onMount(async () => {
		user = (await import('$lib/gunSetup')).user;
	});

	function logout() {
		user.leave();
		username.set('');
	}

	let menuActive = '';
	function toggleMenu() {
		menuActive = menuActive ? '' : 'is-active';
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
			class="navbar-burger {menuActive}"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar"
			on:click={toggleMenu}
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	</div>

	<div id="navbar" class="navbar-menu {menuActive}">
		<div class="navbar-start">
			<a href="/" class="navbar-item"> Workout </a>

			<a href="/" class="navbar-item"> History </a>

			<div class="navbar-item has-dropdown is-hoverable">
				<a href="/settings" class="navbar-link  is-active"> More </a>

				<div class="navbar-dropdown">
					<a href="/settings/profile" class="navbar-item"> Settings </a>
					<a href="/settings/notifications" class="navbar-item"> Profile </a>
					<hr class="navbar-divider" />
					<a href="/about" class="navbar-item"> About </a>
					<hr class="navbar-divider" />
					<a href="/report" class="navbar-item"> Report an issue </a>
				</div>
			</div>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					{#if $username}
						<button class="button is-light" on:click={logout}> Log Out </button>
					{:else}
						<a href="/signup" class="button is-primary">
							<strong>Sign up</strong>
						</a>
						<a href="/login" class="button is-light"> Log in </a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
