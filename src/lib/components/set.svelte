<!-- Component to render a single set in a workout. -->
<script lang="ts">
	import { Icon } from '$lib/components';
	import { slide } from 'svelte/transition';
	// Whether set details are shown.
	let details = false;
	// Whether the set modal is shown.
	let modal = false;

	// Props.
	export let exercise: string;
	export let reps: number;
	export let modifiers = [];
	export let created_at: Date;

	let _created_at = new Date(created_at);

	/**
	 * Toggle whether the editing modal is visible.
	 */
	function toggleModal() {
		modal = !modal;
	}

	/** Handle keyup events when a set is rendered. */
	function keyup(e: KeyboardEvent) {
		if (e.key == 'Escape' && modal) {
			toggleModal();
		}
	}

	/**
	 * Toggle when the details of the exercise are visible
	 */
	function toggleDetails() {
		details = !details;
	}
</script>

<svelte:window on:keyup={keyup} />

<div class="card">
	<header class="card-header" on:click|stopPropagation={toggleDetails}>
		<p class="card-header-title">{reps}x {exercise}</p>
		<button class="card-header-icon" on:click|stopPropagation={toggleModal}>
			<Icon icon="edit" />
		</button>
	</header>
	{#if details}
		<div transition:slide|local class="card-content">
			<div class="content">
				<p class="subtitle">Modifiers</p>
				<div class="tile is-ancestor">
					{#each modifiers as modifier}
						{#if modifier}
							<div class="tile is-parent">
								<div class="tile is-child box">
									<p class="subtitle">{modifier.name}</p>
									<p class="">{modifier.variant}</p>
								</div>
							</div>
						{/if}
					{:else}
						<div class="tile is-parent">
							<div class="tile is-child box">
								<p class="subtitle">None, yet!</p>
							</div>
						</div>
					{/each}
				</div>
				<br />
				<time>{_created_at}</time>
			</div>
		</div>
	{/if}
</div>

<!-- Edit view. -->
<div class:is-active={modal} class="modal">
	<div class="modal-background" on:click={() => (modal = false)} />
	<div class="modal-card" on:click|stopPropagation>
		<header class="modal-card-head">
			<p class="modal-card-title">Edit Set</p>
			<button on:click={toggleModal} class="delete" aria-label="close" />
		</header>
		<section class="modal-card-body">
			<form action="">
				<div class="field">
					<label>
						Exercise
						<input class="input" type="text" bind:value={exercise} />
					</label>
				</div>
				<div class="field">
					<label>
						Reps
						<input class="input" type="number" bind:value={reps} />
					</label>
				</div>
				{#each modifiers as modifier, i}
					{#if modifier}
						<div class="field is-grouped is-align-items-end">
							<div class="control is-flex-shrink-2">
								<label>
									Modifier Name
									<input class="input" type="text" bind:value={modifier.name} />
								</label>
							</div>
							<div class="control is-flex-shrink-2">
								<label>
									Variant
									<input class="input" type="text" bind:value={modifier.variant} />
								</label>
							</div>
							<div class="control">
								<button
									type="button"
									class="button is-danger"
									on:click={() => {
										modifiers[i] = undefined;
									}}
								>
									<Icon icon="delete" />
								</button>
							</div>
						</div>
					{/if}
				{/each}
				<button
					type="button"
					class="button is-primary"
					on:click|preventDefault={() => {
						modifiers = [...modifiers, { name: 'null', variant: 'null' }];
					}}>Add Modifier</button
				>
			</form>
		</section>
		<footer class="modal-card-foot">
			<!-- <button class="button is-success" on:click={save}>Save changes</button> -->
			<button class="button" on:click={toggleModal}>Close</button>
		</footer>
	</div>
</div>

<style>
	.card-header-title {
		text-transform: capitalize;
	}
</style>
