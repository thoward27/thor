<script lang="ts">
	import { Icon, Header } from '$lib/components';
	import { Set as SetComponent } from '$lib/components';
	import { workout, workouts } from '$lib/stores';
	import { workout_utils } from '$lib/utils';
	import clone from 'just-clone';
	import { doubletap, swipe } from '$lib/gestures';
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

	function finish() {
		$workouts = [...$workouts, clone($workout)];
		$workout = workout_utils.create();
	}

	// Expose a menu per-set when a set is swiped.
	let menu_exposed: number | null = null;
	function swipeHandler(event: CustomEvent, index: number) {
		console.log(event);
		if (event.detail.direction == 'right') {
			menu_exposed = index;
		} else {
			menu_exposed = null;
		}
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

{#each $workout.sets.filter((s) => !s.removed) as set (set.id)}
	<div
		class="columns is-vcentered is-mobile"
		in:receive={{ key: set.id }}
		out:send={{ key: set.id }}
		animate:flip
	>
		{#if menu_exposed == set.id || true}
			<div class="column is-narrow">
				<div class="buttons has-addons">
					<button
						class="button"
						on:click={() => ($workout = workout_utils.duplicateSet($workout, set.id))}
					>
						<Icon icon="content_copy" />
					</button>
					<button
						class="button"
						on:click={() => ($workout = workout_utils.removeSet($workout, set.id))}
					>
						<Icon icon="delete" />
					</button>
				</div>
			</div>
		{/if}

		<div
			class="column"
			use:doubletap
			on:doubletap={() => ($workout = workout_utils.duplicateSet($workout, set.id))}
			use:swipe
			on:swipe={(event) => swipeHandler(event, set.id)}
		>
			<SetComponent bind:set />
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
