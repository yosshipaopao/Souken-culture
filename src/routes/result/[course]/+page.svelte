<script lang='ts'>

    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    export let data: PageData;
    const dateToTimeString=(date:Date)=>{
        return `${date.getHours()}:${("00"+date.getMinutes()).slice(-2)}:${("00"+date.getSeconds()).slice(-2)}`
    }
    const calTotal=(total:number)=>{
        const totalHour = Math.floor(total / (1000 * 60 * 60));
        const totalMinuets = Math.floor(total / (1000 * 60)) % 60;
        const totalSecond = Math.floor(total / 1000) % 60;
        return `${("0"+totalHour).slice(-2)}:${("0"+totalMinuets).slice(-2)}:${("0"+totalSecond).slice(-2)}`
    }
    let course = data.course;
    if(browser){
        console.log(course)
    }
</script>

<svelte:head>
    <title>豆腐創作活動研究会|Result</title>
    <meta name="description" content="クイズの結果ページです。"/>
</svelte:head>

<div class='px-2 md:px-8'>
    <select class="select select-bordered select-primary select-sm" bind:value={course} on:change={()=>goto(`/result/${course}`)}>
        <option value={1}>EZ</option>
        <option value={2}>IN</option>
        <option value={3}>MA</option>
        <option value={4}>NZ</option>
    </select>
</div>
<div class='hero min-h-screen fixed top-0 -z-10'>
    <div class='hero-content text-center'>
        <div class='flex flex-col md:flex-row gap-4'>
            <div class='h-96'>
                {#if data.yourResult}
                    <h1 class='font-bold text-3xl'>Result</h1>
                    <h1 class='font-bold text-3xl'>start:   {dateToTimeString(data.yourResult.start)}</h1>
                    <h1 class='font-bold text-3xl'>finish:   {dateToTimeString(data.yourResult.end)}</h1>
                    <h1 class='font-bold text-3xl'>total:   {calTotal(data.yourResult.total)} ( {data.yourResult.penalty} )</h1>
                {:else}
                    <h1 class='font-bold text-3xl'>未達成</h1>
                {/if}
            </div>
        </div>
    </div>
</div>