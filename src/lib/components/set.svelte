<!-- Component to render a single set in a workout. -->
<script lang="ts">
	import { Icon, Modal } from '$lib/components';
	import { slide } from 'svelte/transition';
	import type { Set } from '$lib/interfaces';

	/// The Set object to render.
	export let set: Set;
	let _created_at = new Date(set.created_at);

	// Computed weight of all modifiers.
	$: weightSum = set.modifiers.reduce((prev, obj) => ((obj && Number(obj.variant)) || 0) + prev, 0);

	// Whether set details are shown.
	let details = false;
	// Whether the set modal is shown.
	let modal = false;
</script>

<div class="card">
	<header class="card-header" on:click|stopPropagation={() => (details = !details)}>
		<div class="card-header-title">
			<div class="tags">
				<span class="tag is-medium is-rounded">
					{set.exercise}
				</span>
				<span class="tag is-rounded">
					{set.reps} reps
				</span>
				<span class="tag is-rounded">
					{weightSum} lbs
				</span>
			</div>
		</div>
		<button class="card-header-icon" on:click|stopPropagation={() => (modal = true)}>
			<Icon icon="edit" />
		</button>
	</header>
	{#if details}
		<div transition:slide|local class="card-content">
			<div class="content">
				<p class="subtitle">Modifiers</p>
				<div class="tile is-ancestor">
					{#each set.modifiers as modifier}
						{#if modifier}
							<div class="tile is-parent">
								<div class="tile is-child box">
									<p class="subtitle">{modifier.modifier.name}</p>
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

<Modal bind:active={modal} title="Modify Set">
	<form action="">
		<div class="field">
			<label>
				Exercise
				<input class="input" type="text" bind:value={set.exercise} />
			</label>
		</div>
		<div class="field is-grouped is-align-items-end">
			<div class="control is-expanded">
				<label>
					Reps
					<input class="input" type="number" bind:value={set.reps} />
				</label>
			</div>
			<div class="control">
				<label>
					Failed
					<input type="checkbox" class="checkbox" bind:checked={set.failed} />
				</label>
			</div>
		</div>
		{#each set.modifiers as modifier, i}
			{#if modifier}
				<div class="field is-grouped is-align-items-end">
					<div class="control is-flex-shrink-2">
						<label>
							Modifier Name
							<input class="input" type="text" bind:value={modifier.modifier.name} />
						</label>
					</div>
					<div class="control is-flex-shrink-2">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label>
							Variant
							{#if modifier.modifier.type == 'text'}
								<input class="input" type="text" bind:value={modifier.variant} />
							{:else if modifier.modifier.type == 'number'}
								<input class="input" type="number" bind:value={modifier.variant} />
							{/if}
						</label>
					</div>
					<div class="control">
						<button
							type="button"
							class="button is-danger"
							on:click={() => {
								set.modifiers[i] = undefined;
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
				set.modifiers = [
					...set.modifiers,
					{ modifier: { name: '', type: 'text', unit: '' }, variant: '' }
				];
			}}>Add Modifier</button
		>
	</form>
</Modal>

<style>
	.card-header-title {
		text-transform: capitalize;
	}
</style>
