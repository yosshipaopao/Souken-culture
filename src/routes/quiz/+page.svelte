<script lang='ts'>
	import type {  ActionData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let form: ActionData;
	if (form && form.success) onMount(() => {
      if (form?.redirect) goto(form.redirect);
  });
</script>

<div class='hero min-h-screen fixed top-0 -z-10'>
    <div class='hero-content text-center'>
        <div class='space-y-4'>
            問題を順番通りに解いていきましょう。
        </div>
    </div>
</div>