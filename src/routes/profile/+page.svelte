<script lang='ts'>
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	export let form:ActionData;
</script>

<svelte:head>
	<title>プロファイルの変更</title>
	<meta name='description' content='プロファイルの変更' />
</svelte:head>

<div class='hero min-h-screen fixed top-0 -z-10'>
	<div class='hero-content flex-col md:flex-row-reverse'>
		{#if $page.data.session}
			<div class='text-center lg:text-left'>
				<h1 class='text-5xl font-bold'>Profile</h1>
				<p class='py-6'>ランキングに表示される名前を変更</p>
			</div>
			<div class='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200'>
				<div class='card-body'>
					<form method='post'>
						<div class='form-control'>
							<label class='label' for='name'>
								<span class='label-text'>Name</span>
							</label>
							<input type='text' placeholder='name' name='name' class='input input-bordered' id='name' value={$page.data.session?.user?.name} />
						</div>
						<div class='form-control mt-6'>
							<button class='btn btn-primary'>Update</button>
						</div>
					</form>
				</div>
			</div>
		{:else}
			<div class='text-center lg:text-left'>
				<h1 class='text-5xl font-bold'>Profile</h1>
				<p class='py-6'>ログインしてください</p>
			</div>
			<div class='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200'>
				<div class='card-body'>
					<div class='form-control'>
						<label for='signInModal' class='btn btn-primary'>Sign In</label>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
<div class='toast'>
	{#if form?.success}
		<div class='w-96 alert alert-success'>
			<span>{form.message}</span>
		</div>
	{/if}
</div>