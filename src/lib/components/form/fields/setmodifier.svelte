<script context="module">
	// This variable gives us globally unique IDs for each field.
	let counter = 0;
</script>

<script lang="ts">
	import type { SetModifierType } from '$lib/schemas';
	import autoComplete from '@tarekraafat/autocomplete.js';
	import { onMount } from 'svelte';
	import { modifiers } from '$lib/stores';
	import clone from 'just-clone';

	export let modifier: SetModifierType;

	// TODO: Can we compress this to one lookup?
	$: modifier.modifier.unit = (
		$modifiers.find((value) => value.name == modifier.modifier.name.toLowerCase()) || { unit: '' }
	).unit;
	$: modifier.modifier.type = (
		$modifiers.find((value) => value.name == modifier.modifier.name.toLowerCase()) || {
			type: 'text'
		}
	).type;

	let id = `autocomplete${counter++}`;
	onMount(() => {
		new autoComplete({
			selector: `#${id}`,
			placeHolder: 'Search for a modifier...',
			data: {
				src: $modifiers,
				keys: ['name']
			},
			resultList: {
				tabSelect: true
			},
			resultItem: {
				highlight: {
					render: true
				}
			},
			events: {
				input: {
					selection: (event) => {
						const selection = event.detail.selection.value;
						modifier.modifier = clone(selection);
					}
				}
			}
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.6/dist/css/autoComplete.02.min.css"
	/>
</svelte:head>

<div class="control is-flex-shrink-2">
	<label>
		Modifier Name
		<input
			{id}
			type="search"
			dir="ltr"
			spellcheck="false"
			autocorrect="off"
			autocomplete="off"
			autocapitalize="off"
			maxlength="2048"
			class="input"
			bind:value={modifier.modifier.name}
			data-cy="setmodifier-name-input"
		/>
	</label>
</div>
<div class="control is-flex-shrink-2">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		{modifier.modifier.unit || 'variant'}
		{#if modifier.modifier.type == 'text'}
			<input class="input" type="text" bind:value={modifier.variant} />
		{:else if modifier.modifier.type == 'number'}
			<input class="input" type="number" bind:value={modifier.variant} />
		{/if}
	</label>
</div>

<style>
	input {
		text-transform: capitalize;
		width: 100% !important;
	}
	label {
		text-transform: capitalize;
	}
</style>
