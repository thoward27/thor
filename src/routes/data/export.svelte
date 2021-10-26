<script lang="ts">
	import { Title, Icon } from '$lib/components';
	import { workout } from '$lib/stores';
	import type { Set } from '$lib/interfaces';

	// Filter out the stuff we don't need to save.
	$: finalWorkout = JSON.stringify({ ...$workout, sets: cleanSets($workout.sets) }, undefined, 2);

	function cleanSets(sets: Set[]): Set[] {
		return sets.filter((set) => !set.removed).map((set, index) => ({ ...set, id: index }));
	}
</script>

<Title title="Export Data" />

<div class="block">
	<pre>
    {finalWorkout}
</pre>
</div>
<a
	href="data:text/json;charset=utf-8,{encodeURIComponent(finalWorkout)}"
	download="workout.json"
	class="button is-primary"
>
	<Icon icon="save" />
	<span> Download </span>
</a>
