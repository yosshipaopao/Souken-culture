<script lang='ts'>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Sign In</title>
	<meta name='description' content='Sign In' />
</svelte:head>

<div class='hero min-h-screen fixed top-0 -z-10'>
	<div class='hero-content text-center'>
		<div class='space-y-4'>
			{#if $page.data.session}
				<h1 class='text-5xl font-bold'>Welcome, {$page.data.session.user?.name}!</h1>
				<label for='signOutModal' class='btn'>SignOut</label>
			{:else}
				<h1 class='text-5xl font-bold'>You're not signed in!</h1>
				<label for='signInModal' class='btn'>SignIn</label>
			{/if}
		</div>
	</div>
</div>