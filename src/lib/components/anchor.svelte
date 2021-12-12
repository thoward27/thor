<script lang="ts">
	import { Icon } from '$lib/components';
	import { onMount } from 'svelte';

	export let text: string | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let color: 'primary' | 'info' | 'success' | 'warning' | 'danger' = 'primary';
	export let href: string;

	let disabled: boolean | undefined = true;
	onMount(() => {
		disabled = undefined;
	});
</script>

<a {href} class="button is-{color}" {disabled}>
	{#if icon}
		<Icon {icon} />
	{/if}
	{#if text}
		<span>
			{text}
		</span>
	{/if}
</a>
