<script lang='ts'>
    import type { PageData, ActionData } from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';
    import { page } from '$app/stores';

    export let data: PageData;
    export let form: ActionData;
    const q = 'final';
    let showable = true;
    data.answer.forEach(v => {
        if (!v.isCorrect) {
            showable = false;
        }
    });
</script>
{#if showable}
    <QuizBase {form} answer={data.answer} {q}>
        {#if data.course === 1}
            <Quiz questionnaire='回答を入力'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>初級用問題文</h1>
            <p>より詳細な問題文、、、、、、、、、、、、、</p>
        </span>
                <form method='post' class='space-x-4 space-y-2'>
                    <!--実際に入力する例-->
                    <input type='text' placeholder='Type here' name='answer'
                           class='input input-bordered w-full max-w-xs'
                           value={form?.answer??""} />
                    <button class='btn btn-accent' type='submit'>送信</button>
                </form>
            </Quiz>
        {:else if data.course === 2}
            <Quiz questionnaire='回答を選択'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>中級用問題文</h1>
            <p>より詳細な問題文、、、、、、、、、、、、、</p>
        </span>
                <form method='post'>
                    <!--選択肢的な例-->
                    <button class='btn' name='answer' value='Beginner'>Beginner</button>
                    <button class='btn' name='answer' value='Intermediate'>Intermediate</button>
                    <button class='btn' name='answer' value='Advanced'>Advanced</button>
                </form>
            </Quiz>
        {:else if data.course === 3}
            <Quiz questionnaire='回答を入力'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>上級用問題文</h1>
            <p>より詳細な問題文、、、、、、、、、、、、、</p>
        </span>
                <form method='post'>
                    <button class='btn'>選択肢的な１</button>
                    <button class='btn'>選択肢的な２</button>
                    <button class='btn'>選択肢的な３</button>
                </form>
            </Quiz>
        {/if}
    </QuizBase>
{:else}
    <div class='hero min-h-screen fixed top-0 -z-10'>
        <div class='hero-content text-center'>
            <div class='space-y-4'>
                <h1 class='text-5xl font-bold'>全問正解してから帰ってきな！！</h1>
            </div>
        </div>
    </div>
{/if}