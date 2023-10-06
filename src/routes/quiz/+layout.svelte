<script lang='ts'>
    import {page} from '$app/stores';
    import type {PageData} from './$types';
    import {onMount} from 'svelte';

    export let data: PageData;

    let here: string;
    onMount(() => {
        here = window.location.pathname;
    });
    let countUpHour = 0;
    let countUpMinute = 0;
    let countUpSecond = 0;

    if (data.start) {
        const diffTime = new Date().getTime() - data.start.getTime();
        countUpHour = Math.floor(diffTime / (1000 * 60 * 60));
        countUpMinute = Math.floor(diffTime / (1000 * 60)) % 60;
        countUpSecond = Math.floor(diffTime / 1000) % 60;
        setInterval(() => {
            countUpSecond++;
            if (countUpSecond >= 60) {
                countUpSecond = 0;
                countUpMinute++;
            }
            if (countUpMinute >= 60) {
                countUpMinute = 0;
                countUpHour++;
            }
        }, 1000);
    }
    let help = true;
    data.answer.forEach(v => {
        if (v.isCorrect) {
            help = false;
        }
    });
</script>

<svelte:head>
    <title>豆腐創作活動研究会|クイズ</title>
    <meta name='description' content='豆腐創作活動研究会のクイズページです。'/>
</svelte:head>

{#if $page.data.session}
    {#if data.status === "notStarted"}
        <div class='hero min-h-screen fixed top-0 -z-10'>
            <div class='hero-content flex flex-col items-center justify-center'>
                <h1 class='text-5xl font-bold'>コースを選択してください</h1>
                <form method='post' action='/quiz?/course' class='flex flex-col gap-2 justify-center w-96'>
                    <input type='hidden' name='redirect' value={here}>
                    <button type="submit" name="course" value="beginner" class="btn btn-primary course-label"
                           disabled={data.doneCourses.some(v=>v===1)}>ただのなぞなぞ超絶簡単コース</button>
                    <button type="submit" name="course" value="intermediate" class="btn btn-primary course-label"
                           disabled={data.doneCourses.some(v=>v===2)}>校内周遊コース</button>
                    <button type="submit" name="course" value="advanced" class="btn btn-primary course-label"
                           disabled={data.doneCourses.some(v=>v===3)}>数学鬼コース</button>
                </form>
            </div>
        </div>
    {:else }
        <main>
            <div class='flex justify-between'>
                <h1 class='font-bold'>
                    {#if data.start}
                    <span class='countdown font-mono text-2xl'>
                      <span style='--value:{countUpHour};'></span>h
                      <span style='--value:{countUpMinute};'></span>m
                      <span style='--value:{countUpSecond};'></span>s
                    </span>
                    {/if}
                </h1>
                <div>
                    <label for='help' class='btn ml-4'>HELP</label>
                    <ul class='steps'>
                        {#each data.answer as answer}
                            <a href='/quiz/{answer.question}'
                               class='step !min-w-[40px] md:!min-w-[64px] {answer.question===""?"":answer.isCorrect?"step-primary":"step-error"}'/>
                        {/each}
                    </ul>
                </div>
            </div>
            <slot/>
            <input type='checkbox' id='help' class='modal-toggle' value={help}/>
            <div class='modal'>
                <div class='modal-box'>
                    <h3 class='text-lg font-bold'>HELP</h3>
                    <p class='py-4'>ご不明な点があれば4号館4会の創研ブースへお越しください</p>
                </div>
                <label class='modal-backdrop' for='help'>Close</label>
            </div>
        </main>
    {/if}
{:else}
    <div class='hero min-h-screen fixed top-0 -z-10'>
        <div class='hero-content text-center'>
            <div class='space-y-4'>
                <h1 class='text-5xl font-bold'>ログインしてクイズを開始</h1>
                <label for='signInModal' class='btn'>SignIn</label>
            </div>
        </div>
    </div>
{/if}