<script lang="ts">
	import { Title, Icon } from '$lib/components';
	import { workouts } from '$lib/stores';
	import type { Set } from '$lib/utils';

	// Filter out the stuff we don't need to save.
	$: output = JSON.stringify(
		$workouts.map((workout) => ({ ...workout, sets: cleanSets(workout.sets) })),
		undefined,
		2
	);

	function cleanSets(sets: Set[]): Set[] {
		return sets.filter((set) => !set.removed).map((set, index) => ({ ...set, id: index }));
	}
</script>

<Title title="Export Data" />

<div class="block">
	<pre>
    {output}
</pre>
</div>
<a
	href="data:text/json;charset=utf-8,{encodeURIComponent(output)}"
	download="workout.json"
	class="button is-primary"
>
	<Icon icon="save" />
	<span> Download </span>
</a>
