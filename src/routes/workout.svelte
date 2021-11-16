<script lang="ts">
	import { Header, Button } from '$lib/components';
	import { Set as SetComponent } from '$lib/components';
	import { workout, workouts } from '$lib/stores';
	import { workout_utils } from '$lib/utils';
	import clone from 'just-clone';
	import { doubletap } from '$lib/gestures';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, _params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	function start() {
		$workout = workout_utils.create();
	}
	function finish() {
		$workouts = [...$workouts, clone($workout)];
		$workout = workout_utils.create();
	}
	function addSet() {
		$workout = workout_utils.addSet($workout);
	}
	function removeSet(id: number) {
		$workout = workout_utils.removeSet($workout, id);
	}
	function cloneSet(id: number) {
		$workout = workout_utils.duplicateSet($workout, id);
	}
</script>

<svelte:head>
	<title>Thor Fitness</title>
</svelte:head>

<Header title="Workout">
	<span slot="controls">
		{#if $workout.sets.length > 0}
			<Button text="Add Set" icon="add" color="success" onClick={addSet} />
			<Button text="Reset" icon="delete" color="danger" onClick={start} />
			<Button text="Finish" icon="check_circle_outline" color="success" onClick={finish} />
		{:else}
			<Button text="Start Workout" onClick={addSet} />
		{/if}
	</span>
</Header>

{#each $workout.sets.filter((s) => !s.removed) as set, i (set.id)}
	<div
		class="columns is-vcentered is-mobile"
		in:receive={{ key: set.id }}
		out:send={{ key: set.id }}
		animate:flip
	>
		<div class="column" use:doubletap on:doubletap={() => cloneSet(set.id)}>
			<SetComponent bind:set>
				<div slot="actions">
					<Button
						text="Duplicate"
						icon="content_copy"
						color="success"
						onClick={() => cloneSet(set.id)}
					/>
					<Button text="Delete" icon="delete" color="danger" onClick={() => removeSet(set.id)} />
				</div>
			</SetComponent>
		</div>
	</div>
{/each}
<div class="block mt-6" />

<style>
	.column {
		padding-bottom: 0 !important;
		padding-top: 5px !important;
	}
</style>
