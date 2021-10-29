<script lang="ts">
	import { Title, Icon } from '$lib/components';
	import { Set as SetComponent } from '$lib/components';
	import { workout, workouts } from '$lib/stores';
	import { workout as newWorkout, createSet, duplicateSet } from '$lib/interfaces';
	import clone from 'just-clone';

	function addSet() {
		// Simply adds a set to the end of the workout.
		console.log('adding set');
		$workout.sets = [...$workout.sets, createSet($workout.sets.length, 'null')];
		console.log($workout);
	}
	function reset() {
		// Resets the workout by clearing it.
		console.log('reset');
		$workout = newWorkout();
		console.log($workout);
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

<Title title="Workouts" />

{#if $workout.sets.length > 0}
	{#each $workout.sets as set, i}
		{#if !set.removed}
			<div class="columns is-vcentered">
				<div class="column is-four-fifths">
					<SetComponent
						bind:exercise={set.exercise}
						bind:reps={set.reps}
						bind:modifiers={set.modifiers}
						created_at={set.created_at}
					/>
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
	<button class="button is-success" on:click={addSet}>
		<Icon icon="add" />
		<span> Add Set </span>
	</button>
	<button class="button is-danger" on:click={reset}>
		<Icon icon="delete" />
		<span>
			Reset
		</span>
	</button>
	<button class="button is-success" on:click={finish}>
		<Icon icon="check_circle_outline" />
		<span>
			Finish
		</span>
	</button>
{:else}
	<button class="button is-success" on:click={addSet}>Start Workout</button>
{/if}
