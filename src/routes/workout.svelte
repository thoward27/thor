<script lang="ts">
	import { Header, Button } from '$lib/components';
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
			<Button
				text="Add Set"
				icon="add"
				color="success"
				onClick={() => ($workout = workout_utils.addSet($workout))}
			/>
			<Button
				text="Reset"
				icon="delete"
				color="danger"
				onClick={() => ($workout = workout_utils.create())}
			/>
			<Button text="Finish" icon="check_circle_outline" color="success" onClick={finish} />
		{:else}
			<Button text="Start Workout" onClick={() => ($workout = workout_utils.addSet($workout))} />
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
					<Button
						icon="content_copy"
						color="success"
						onClick={() => ($workout = workout_utils.duplicateSet($workout, set.id))}
					/>
					<Button
						icon="delete"
						color="danger"
						onClick={() => ($workout = workout_utils.removeSet($workout, set.id))}
					/>
				</div>
			</div>
		{/if}

		<div
			class="column"
			use:doubletap
			on:doubletap={() => ($workout = workout_utils.duplicateSet($workout, set.id))}
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
