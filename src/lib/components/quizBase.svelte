<script lang='ts'>
	import Icon from '@iconify/svelte';

	export let answer: { question: string, isCorrect: boolean }[] = [];
	export let form: { success?: boolean, message?: string } | null = null;
	export let q: string;
	if (form && !form.success) {
		setTimeout(() => form = null, 3000);
	}
</script>
<div class='toast'>
	{#if form && !form.success}
		<div class='alert alert-error'>
			<span>{form.message}</span>
		</div>
	{/if}
</div>
{#if form?.success || answer.find((v) => v.question === q && v.isCorrect)}
	<div class='hero min-h-screen fixed top-0 -z-10'>
		<div class='hero-content text-center'>
			<div class='space-y-4'>
				<h1 class='text-5xl font-bold'>
					<Icon icon='mdi:check-circle-outline' class='inline-block mr-4' />
					正解！
				</h1>
			</div>
		</div>
	</div>
{:else}
	<slot />
{/if}