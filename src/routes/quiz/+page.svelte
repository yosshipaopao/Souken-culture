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
            <h1 class='text-3xl font-bold'>QRコードまだ作れないので直接リンク</h1>
            <div class='w-96 flex flex-row justify-between'>
                <a class='btn' href='/quiz/f0ce82972ab64844835512b5b63937bc'>1</a>
                <a class='btn' href='/quiz/eaa930eded7648839a032a116880d817'>2</a>
                <a class='btn' href='/quiz/a66a368a57984089a823a74d9fb7df37'>3</a>
                <a class='btn' href='/quiz/30ce89e815d0490d90a0ec6fd6b759fe'>4</a>
                <a class='btn' href='/quiz/8ecf85d1eaba4daab1e35811c0b502a2'>5</a>
            </div>
        </div>
    </div>
</div>