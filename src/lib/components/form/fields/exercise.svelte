<script context="module">
    let counter = 0;
</script>
<script>
    import { onMount } from "svelte";

    let gun;
    onMount(async () => {
        gun = (await import('$lib/initGun')).gun;
    });

    let id = `autocompleteExercise${counter}`;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.6/dist/css/autoComplete.02.min.css"
	/>
</svelte:head>

<div class="control">
    <label>
        Exercise

    </label>
</div>
