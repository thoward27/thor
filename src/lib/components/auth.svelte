<script lang="ts">
	import { goto } from '$app/navigation';
	import type { IGunChainReference } from 'gun/types/chain';
	import { onMount } from 'svelte';

	let user: IGunChainReference;
	onMount(async () => {
		user = (await import('$lib/db')).user;
	});

	export let signup = false;

	let username: string;
	let password: string;
	let repeat: string;
	let terms: boolean;
	let error: string;

	function login() {
		console.log('Attempting login.');
		// @ts-ignore
		user.auth(username, password, ({ err }) => {
			if (err) {
				console.log('Login failed.');
				error = err;
			} else {
				goto('/');
			}
		});
	}
	function register() {
		if (password == repeat) {
			console.log('Registering new account.');
			// @ts-ignore
			user.create(username, password, ({ err }) => {
				if (err) {
					console.log('create account failed');
					error = err;
				} else {
					login();
				}
			});
		} else {
			error = 'Passwords do not match.';
		}
	}
</script>

<div class="container">
	{#if error}
		<div class="block">
			<article class="message is-danger">
				<div class="message-header">
					<p>Failed</p>
					<button
						class="delete"
						aria-label="delete"
						on:click={() => {
							error = null;
						}}
					/>
				</div>
				<div class="message-body">
					{error}
				</div>
			</article>
		</div>
	{/if}

	<div class="container">
		<div class="field">
			<label class="label" for="alias">Alias</label>
			<div class="control">
				<input
					id="alias"
					class="input"
					type="text"
					placeholder="User Alias"
					bind:value={username}
				/>
			</div>
		</div>

		<div class="field">
			<label class="label" for="password">Password</label>
			<div class="control">
				<input id="password" class="input" type="password" bind:value={password} />
			</div>
		</div>

		{#if signup}
			<div class="field">
				<label class="label" for="repeat">Repeat Password</label>
				<div class="control">
					<input id="repeate" class="input" type="password" bind:value={repeat} />
				</div>
			</div>

			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" bind:checked={terms} />
						I agree to the <a href="/terms">terms and conditions</a>
					</label>
				</div>
			</div>
		{/if}

		<div class="field is-grouped">
			{#if signup}
				<div class="control">
					<button class="button is-link" on:click={register}>Sign Up</button>
				</div>
			{:else}
				<div class="control">
					<button class="button is-link" on:click={login}>Log in</button>
				</div>
			{/if}
			<div class="control">
				<button class="button is-link is-light" on:click={() => goto('/')}>Cancel</button>
			</div>
		</div>
	</div>
</div>
