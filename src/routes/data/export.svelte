<script lang="ts">
	import { Icon, Header } from '$lib/components';
	import type { SetType } from '$lib/schemas';
	import { onMount } from 'svelte';

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

	$: output = JSON.stringify(
		Object.entries(store).map(([_, value]) => ({ ...value, sets: cleanSets(value.sets) })),
		undefined,
		2
	);
	function cleanSets(sets: SetType[]): SetType[] {
		return sets.filter((set) => !set.removed).map((set, index) => ({ ...set, id: index }));
	}
</script>

<Header title="Export Data">
	<span slot="controls">
		<a
			href="data:text/json;charset=utf-8,{encodeURIComponent(output)}"
			download="workout.json"
			class="button is-primary"
		>
			<Icon icon="save" />
			<span> Download </span>
		</a>
	</span>
</Header>

<div class="block">
	<pre>{output}</pre>
</div>
