<script lang="ts">
	import { Title, Icon } from '$lib/components';
	import { Set as SetComponent } from '$lib/components';
	import { workout, workouts } from '$lib/stores';
	import { workout as newWorkout, createSet, duplicateSet } from '$lib/interfaces';
	import clone from 'just-clone';

	$: sets = $workout.sets;

	/**
	 * Add a set to the end of the workout.
	 */
	function addSet() {
		// Simply adds a set to the end of the workout.
		$workout.sets = [...$workout.sets, createSet($workout.sets.length, 'null')];
		console.log(`added set ${workout}`);
	}

	function reset() {
		// Resets the workout by clearing it.
		$workout = newWorkout();
		console.log(`reset workout to ${workout}`);
	}
	function duplicate(index: number) {
		// Duplicate a set.
		return () => {
			$workout.sets = [...$workout.sets, duplicateSet($workout.sets.length, $workout.sets[index])];
			console.log($workout);
		};
	}
	function remove(index: number) {
		// Mark a set as removed.
		return () => {
			$workout.sets[index].removed = true;
			console.log($workout);
		};
	}
	function finish() {
		$workouts = [...$workouts, clone($workout)];
		reset();
	}
</script>

<svelte:head>
	<title>Thor Fitness</title>
</svelte:head>

<div
	class="columns mb-4 is-mobile is-multiline is-align-items-end is-justify-content-space-between"
>
	<div class="column is-narrow">
		<Title title="Workout" />
	</div>
	<div class="column is-narrow">
		{#if sets.length > 0}
			<button class="button is-success" on:click={addSet}>
				<Icon icon="add" />
				<span> Add Set </span>
			</button>
			<button class="button is-danger" on:click={reset}>
				<Icon icon="delete" />
				<span> Reset </span>
			</button>
			<button class="button is-success" on:click={finish}>
				<Icon icon="check_circle_outline" />
				<span> Finish </span>
			</button>
		{:else}
			<button class="button is-success" on:click={addSet}>Start Workout</button>
		{/if}
	</div>
</div>

{#each sets as set, i}
	{#if !set.removed}
		<div class="columns is-vcentered">
			<div class="column is-four-fifths">
				<SetComponent bind:set />
			</div>
			<div class="column">
				<p class="buttons">
					<button class="button" on:click={duplicate(i)}>
						<Icon icon="content_copy" />
					</button>
					<button class="button" on:click={remove(i)}>
						<Icon icon="delete" />
					</button>
				</p>
			</div>
		</div>
	{/if}
{/each}
<div class="block mt-6" />

<style>
	.column {
		padding-bottom: 0 !important;
		padding-top: 5px !important;
	}
</style>
