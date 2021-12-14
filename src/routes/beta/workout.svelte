<script>
	import { onMount } from 'svelte';
	import { workout } from '$lib/stores';
	import { set_utils, gun_utils } from '$lib/utils';
	import { Button } from '$lib/components';

	const KEY = 'test-workouts/v1';
	let store = {};
	let gun;
	let user;
	onMount(async () => {
		gun = (await import('$lib/initGun')).gun;
		user = gun.user().recall({ sessionStorage: true });
		gun
			.get(KEY)
			.get(user.is.pub)
			.map()
			.on(function (data, key) {
				// TODO: https://gun.eco/docs/API#-a-name-open-a-gun-open-callback-
				if (data) {
					delete data['_'];
					store[key] = { ...data, sets: [] };
					gun
						.get(KEY)
						.get(user.is.pub)
						.get(key)
						.get('sets')
						.map()
						.once((data, _) => {
							delete data['_'];
							store[key].sets = [...store[key].sets, data];
						});
				} else {
					delete store[key];
					store = store;
				}
			});
	});

	const create = () =>
		($workout = { created_at: JSON.stringify(new Date()), sets: [set_utils.create(0, 'null')] });
	const reset = () => create();
	const finish = () => {
		gun_utils.workout.add(gun, user.is.pub, $workout);
		$workout = null;
	};

	$: workouts = Object.entries(store);
</script>

{#if $workout}
	<Button onClick={finish} text="Finish" />
	<Button onClick={reset} text="Reset" />
{:else}
	<Button onClick={create} text="Start" />
{/if}

{workouts.length}
{#each workouts as [key, workout] (key)}
	<p>
		{JSON.stringify(workout)}
	</p>
{/each}
