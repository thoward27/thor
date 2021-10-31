<script lang="ts">
	/// Whether to display the modal.
	export let active = false;

	/// Modal title
	export let title: string;

	export let onSave: () => void | null = null;

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
				<button class="button is-primary" on:click={onSave}>Save</button>
			{/if}
			<button class="button" on:click={() => (active = false)}>Close</button>
		</footer>
	</div>
</div>

<style>
	.modal-card-title {
		text-transform: capitalize;
	}
</style>
