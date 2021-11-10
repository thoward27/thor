<script lang="ts">
	import { Icon, Header } from '$lib/components';
	import { workouts } from '$lib/stores';
	import type { SetType } from '$lib/schemas';

	// Filter out the stuff we don't need to save.
	$: output = JSON.stringify(
		$workouts.map((workout) => ({ ...workout, sets: cleanSets(workout.sets) })),
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
