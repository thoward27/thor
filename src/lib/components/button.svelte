<script lang="ts">
	import { Icon } from '$lib/components';
	import { onMount } from 'svelte';

	export let text: string | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let color: 'primary' | 'info' | 'success' | 'warning' | 'danger' = 'primary';
	export let onClick: () => void = () => null;

	let disabled = true;
	onMount(() => {
		disabled = false;
	});
</script>

<button class="button is-{color}" on:click|stopPropagation={onClick} {disabled}>
	{#if icon}
		<Icon {icon} />
	{/if}
	{#if text}
		<span>
			{text}
		</span>
	{/if}
</button>
