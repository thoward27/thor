<script>
	import { Icon, Title } from '$lib/components';
	import { workouts } from '$lib/stores';

	let files;
	$: file = files ? files[0] : null;

	let upload;

	function load() {
		let reader = new FileReader();
		reader.onload = (e) => {
			// @ts-ignore
			upload = JSON.parse(e.target.result);
		};
		reader.readAsText(file);
	}

	function set() {
		$workouts = upload;
	}
</script>

<Title title="Import Data" />

<div class="block">
	<div class="file">
		<label class="file-label">
			<input class="file-input" type="file" name="resume" bind:files on:change={load} />
			<span class="file-cta">
				<span class="file-icon">
					<Icon icon="upload" />
				</span>
				<span class="file-label"> Choose a file… </span>
			</span>
			{#if file}
				<span class="file-name">
					{file.name}
				</span>
			{/if}
		</label>
	</div>
</div>
<button class="button is-success" disabled={!file} on:click={set} on:change={load}>Import</button>
