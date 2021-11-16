<script lang="ts">
	import { scale } from 'svelte/transition';

	// export let size: 'small' | 'medium' | 'large' = 'medium';
	$: size = expanded == true ? 'large' : 'medium';

	// Props controlling the name tag.
	export let name: string;
	export let nameColor = 'dark';

	// Props controlling the variant tag.
	export let variant: string | null = null;
	export let variantColor = 'light';

	// Whether this tag is "expanded"
	export let expanded = false;

	// What to do when the delete button is pressed in the expanded mode.
	export let onDelete: null | (() => void) = null;
	export let onTap: () => void = () => null;
</script>

<div class="control" on:click={onTap} transition:scale>
	<div class="tags has-addons are-{size}">
		<span class="tag is-rounded is-{nameColor}">
			{name}
		</span>
		{#if variant}
			<span transition:scale class="tag is-rounded is-{variantColor}">
				{variant}
				{#if expanded && onDelete}
					<button transition:scale class="delete is-small" on:click|stopPropagation={onDelete} />
				{/if}
			</span>
		{/if}
	</div>
</div>

<style>
	span {
		transition: font-size 300ms;
	}
</style>
