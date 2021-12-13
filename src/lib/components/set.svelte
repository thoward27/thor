<!-- Component to render a single set in a workout. -->
<script lang="ts">
	import { Icon, Tag, Modal, SetModifierField } from '$lib/components';
	import type { SetType } from '$lib/schemas';
	import Button from './button.svelte';
	import clone from 'just-clone';
	import { slide } from 'svelte/transition';
	import { modifiers } from '$lib/stores';

	/// The Set object to render.
	export let set: SetType;
	export let expanded = true;

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

	/**Add a proposed modifier to the modifiers list.*/
	function addModifier(name: string, variant: string | number | null) {
		const lowerName = name.toLowerCase();

		// Proposed Modifier to add.
		const cannonical = $modifiers.find((modifier) => modifier.name.toLowerCase() == lowerName);
		const existing = set.modifiers.findIndex(
			(modifier) => modifier.modifier.name.toLowerCase() == lowerName
		);
		if (cannonical && existing > -1 && cannonical.type == 'number') {
			// Update existing modifier, instead of creating a new one.
			let update = set.modifiers.splice(existing, 1)[0];
			update.variant += variant;
			set.modifiers = [...set.modifiers, update];
		} else if (cannonical) {
			// Create a new one, since we have the modifier.
			set.modifiers = [
				...set.modifiers,
				{ modifier: clone(cannonical), removed: false, variant: variant }
			];
		} else {
			// Nothing to do here.
			throw Error('Tried to add a SetModifier without a Modifier');
		}
	}
</script>

<div class="box mb-0" data-cy="set" on:click={() => (expanded = !expanded)}>
	<div class="columns is-mobile">
		<div class="column">
			<div class="field is-grouped is-grouped-multiline">
				<Tag name={set.exercise} bind:expanded />
				<Tag name="reps" variant={set.reps} bind:expanded />
				{#each set.modifiers.filter((set) => !set.removed) as modifier, i}
					<Tag name={modifier.modifier.name} variant={modifier.variant} bind:expanded />
				{/each}
			</div>
		</div>
	</div>
	{#if expanded}
		<div transition:slide class="container">
			<div class="divider">Quick Add</div>
			<div class="block">
				<div class="block">
					<Tag
						name="weight"
						nameColor="success"
						variant="+50"
						onTap={() => addModifier('weight', 50)}
					/>
				</div>
			</div>
			<div class="divider">Quick Remove</div>
			<div class="block">
				<div class="block">
					<Tag
						name="weight"
						nameColor="danger"
						variant="-50"
						onTap={() => addModifier('weight', -50)}
					/>
				</div>
			</div>
			<div class="divider">Quick Actions</div>
			<div class="buttons">
				<Button icon="edit" text="Edit" color="info" onClick={() => (modal = true)} />
				<slot name="actions" />
			</div>
		</div>
	{/if}
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
