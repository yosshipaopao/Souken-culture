<script lang='ts'>
	import Icon from '@iconify/svelte';

	export let answer: { question: string, isCorrect: boolean }[] = [];
	export let form: { success?: boolean, message?: string } | null = null;
	export let q: string;
	if (form && !form.success) {
		setTimeout(() => form = null, 3000);
	}
</script>
<div class='toast z-50'>
	{#if form && !form.success}
		<div class='alert alert-error'>
			<span>{form.message}</span>
		</div>
	{/if}
</div>
{#if form?.success || answer.find((v) => v.question === q && v.isCorrect)}
	
	<slot name='correct' />
{:else}
	<slot />
{/if}

