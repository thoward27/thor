<script lang="ts">
	import { Icon, Header } from '$lib/components';
	import { Set as SetComponent } from '$lib/components';
	import { workout, workouts } from '$lib/stores';
	import { workout_utils } from '$lib/utils';
	import clone from 'just-clone';

	function finish() {
		$workouts = [...$workouts, clone($workout)];
		$workout = workout_utils.create();
	}
</script>

<svelte:head>
	<title>Thor Fitness</title>
</svelte:head>

<Header title="Workout">
	<span slot="controls">
		{#if $workout.sets.length > 0}
			<button
				class="button is-success"
				on:click={() => ($workout = workout_utils.addSet($workout))}
			>
				<Icon icon="add" />
				<span> Add Set </span>
			</button>
			<button class="button is-danger" on:click={() => ($workout = workout_utils.create())}>
				<Icon icon="delete" />
				<span> Reset </span>
			</button>
			<button class="button is-success" on:click={finish}>
				<Icon icon="check_circle_outline" />
				<span> Finish </span>
			</button>
		{:else}
			<button
				class="button is-success"
				on:click={() => ($workout = workout_utils.addSet($workout))}
			>
				Start Workout
			</button>
		{/if}
	</span>
</Header>

{#each $workout.sets as set, i}
	{#if !set.removed}
		<div class="columns is-vcentered">
			<div class="column is-four-fifths">
				<SetComponent bind:set />
			</div>
			<div class="column">
				<p class="buttons">
					<button
						class="button"
						on:click={() => ($workout = workout_utils.duplicateSet($workout, i))}
					>
						<Icon icon="content_copy" />
					</button>
					<button class="button" on:click={() => ($workout = workout_utils.removeSet($workout, i))}>
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
