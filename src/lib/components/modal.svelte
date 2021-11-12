<script lang="ts">
	import Button from './button.svelte';

	/// Whether to display the modal.
	export let active = false;

	/// Modal title
	export let title: string;

	/// Void callback for save events, button only rendered if provided.
	export let onSave: null | (() => void) = null;

	// We use this to allow 'escape' to close the modal.
	function keyup(e: KeyboardEvent) {
		if (e.key == 'Escape' && active) {
			active = false;
		}
	}
</script>

<svelte:window on:keyup={keyup} />

<div class="modal" class:is-active={active}>
	<div class="modal-background" on:click={() => (active = false)} />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{title}</p>
			<button class="delete" aria-label="close" on:click={() => (active = false)} />
		</header>
		<section class="modal-card-body">
			<slot />
		</section>
		<footer class="modal-card-foot">
			{#if onSave}
				<Button text="Save" color="primary" onClick={onSave}/>
			{/if}
			<Button text="Close" color="info" onClick={() => (active = false)} />
		</footer>
	</div>
</div>

<style>
	.modal-card-title {
		text-transform: capitalize;
	}
</style>
