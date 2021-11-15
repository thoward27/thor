<!-- Component to render a single set in a workout. -->
<script lang="ts">
	import { Icon, Modal, SetModifierField } from '$lib/components';
	import type { SetType } from '$lib/schemas';
	import Button from './button.svelte';
	import clone from 'just-clone';

	/// The Set object to render.
	export let set: SetType;

	// Computed weight of all modifiers.
	// $: lbs = set.modifiers.reduce(
	// 	// Object cannot be null,
	// 	(prev, obj) => ((obj && obj.modifier.unit == 'lbs' && Number(obj.variant)) || 0) + prev,
	// 	0
	// );

	// Whether the set modal is shown.
	let modal = false;

	function removeModifier(index: number): void {
		set.modifiers.splice(index, 1);
		set.modifiers = clone(set.modifiers);
	}
</script>

<div class="box mb-0" data-cy="set">
	<div class="columns is-mobile">
		<div class="column">
			<div class="field is-grouped is-grouped-multiline">
				<div class="control">
					<div class="tags are-medium">
						<span class="tag is-rounded is-info">
							{set.exercise}
						</span>
					</div>
				</div>
				<div class="control">
					<div class="tags are-medium has-addons">
						<span class="tag is-rounded is-info"> reps </span>
						<span class="tag is-rounded is-light">
							{set.reps}
						</span>
					</div>
				</div>
				{#each set.modifiers.filter((set) => !set.removed) as modifier, i}
					<div class="control">
						<div class="tags are-medium has-addons">
							<span class="tag is-rounded is-dark">
								{modifier.modifier.name}
							</span>
							<span class="tag is-rounded is-light">
								{modifier.variant}
								<!-- TODO: Feature flag around the delete button. -->
								<!-- <button class="delete is-small" on:click={() => removeModifier(i)}/> -->
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="column is-narrow">
			<Button icon="edit" color="info" onClick={() => (modal = true)} />
		</div>
	</div>
</div>

<Modal bind:active={modal} title="Modify Set">
	<form action="" data-cy="edit">
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
					<input class="input" type="number" min="0" max="1000" bind:value={set.reps} />
				</label>
			</div>
			<div class="control">
				<label>
					Failed
					<input type="checkbox" class="checkbox" bind:checked={set.failed} />
				</label>
			</div>
		</div>
		{#each set.modifiers.filter((s) => !s.removed) as modifier, i}
			{#if modifier}
				<div class="field is-grouped is-align-items-end">
					<SetModifierField bind:modifier />
					<div class="control">
						<button type="button" class="button is-danger" on:click={() => removeModifier(i)}>
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
					{ modifier: { name: '', type: 'text', unit: '' }, variant: '', removed: false }
				];
			}}>Add Modifier</button
		>
	</form>
</Modal>
