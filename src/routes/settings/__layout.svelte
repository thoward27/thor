<!-- src/routes/settings/__layout.svelte -->
<script>
	import { Title } from '$lib/components';
	import { page } from '$app/stores';
</script>

<Title title="Settings" />

<div class="columns">
	<div class="column is-one-quarter">
		<div class="box">
			<aside class="menu">
				<p class="menu-label">General</p>
				<ul class="menu-list">
					<li>
						<a
							href="/settings/profile"
							class:is-active={$page.path.startsWith('/settings/profile')}
						>
							Profile
						</a>
					</li>
				</ul>
				<p class="menu-label">Administration</p>
				<ul class="menu-list">
					<li>
						<a
							href="/settings/notifications"
							class:is-active={$page.path.startsWith('/settings/notifications')}
						>
							Notifications
						</a>
					</li>
				</ul>
			</aside>
		</div>
	</div>
	<div class="column">
		<div class="box">
			<slot />
		</div>
	</div>
</div>
