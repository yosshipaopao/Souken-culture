<script lang='ts'>

    import type { PageData } from './$types';

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
</script>

<svelte:head>
    <title>豆腐創作活動研究会|Result</title>
    <meta name="description" content="クイズの結果ページです。"/>
</svelte:head>

<div class='hero min-h-screen fixed top-0 -z-10'>
    <div class='hero-content text-center'>
        <div class='flex flex-col md:flex-row gap-4'>
            <div class='h-96 flex flex-col items-center justify-end md:items-end md:justify-center gap-2'>
                {#if data.yourResult}
                    <h1 class='font-bold text-3xl'>Result</h1>
                    <h1 class='font-bold text-3xl'>start:   {dateToTimeString(data.yourResult.start)}</h1>
                    <h1 class='font-bold text-3xl'>finish:   {dateToTimeString(data.yourResult.end)}</h1>
                    <h1 class='font-bold text-3xl'>total:   {calTotal(data.yourResult.total)}</h1>
                {:else}
                    <h1 class='font-bold text-3xl'>未達成</h1>
                {/if}
            </div>
            <div class='h-96 flex flex-col items-center justify-start md:items-start md:justify-center gap-2'>
                {#each data.fastest as user}
                    <div class="card card-side h-24 bg-base-200 shadow-xl">
                        <figure><img src={user.image} alt="icon"/></figure>
                        <div class="card-body py-3 text-left">
                            <h2 class="card-title">{user.name}</h2>
                            <p>total:   {calTotal(user.total)}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>