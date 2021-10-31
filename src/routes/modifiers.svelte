<script>
	import { Title, Modal } from '$lib/components';
	import { modifiers } from '$lib/stores';

	// Whether the Add Modifier modal is shown.
	let addForm = false;
</script>

<div class="columns is-mobile is-align-items-end is-justify-content-space-between">
	<div class="column is-narrow">
		<Title title="Modifiers" />
	</div>
	<div class="column is-narrow">
		<button on:click={() => (addForm = !addForm)} class="button is-primary">New</button>
	</div>
</div>
<div class="tile is-ancestor">
	{#each $modifiers as modifier, index}
		<div class="tile is-parent">
			<div class="tile is-child box">
				<p class="title">{modifier.name}</p>
				<form action="">
					<div class="field is-align-items-end">
						<div class="control">
							<label class="label">
								Units
								<input class="input" type="text" bind:value={modifier.unit} />
							</label>
						</div>
						<p class="help">How do you measure this modifier.</p>
					</div>
					<div class="field">
						<label class="label" for="{index}-select">Type</label>
						<div class="control">
							<div class="select">
								<select class="select" bind:value={modifier.type}>
									<option value="text">text</option>
									<option value="number">number</option>
									<option value="checkbox">checkbox</option>
								</select>
							</div>
						</div>
						<p class="help">What form type to render.</p>
					</div>
				</form>
			</div>
		</div>
	{/each}
</div>

<Modal bind:active={addForm} title="add new modifier">
	<form action="">
		<div class="field">
			<label class="label" for="add-name">Name</label>
			<div class="control">
				<input type="text" class="input" />
			</div>
		</div>
	</form>
</Modal>

<style>
	.title {
		text-transform: capitalize;
	}
</style>
