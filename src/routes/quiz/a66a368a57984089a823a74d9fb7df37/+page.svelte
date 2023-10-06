<script lang='ts'>
    import type {PageData, ActionData} from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';
    import Katex from "svelte-katex";
    import Icon from "@iconify/svelte";

    export let data: PageData;
    export let form: ActionData;
    const q = 'a66a368a57984089a823a74d9fb7df37';
</script>
<QuizBase {form} answer={data.answer} {q}>
    {#if data.course === 1}
        <Quiz questionnaire='回答を入力' image="/images/quiz/EZ-3.png">
        <span slot='quiz'>
            ※ひらがなで答えてください
        </span>
            <form method='post' class='space-x-4 space-y-2'>
                <!--実際に入力する例-->
                <input type='text' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
        </Quiz>
    {:else if data.course === 2}
        <Quiz questionnaire='回答を選択' image="/images/quiz/IN-3.png">
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>Humour</h1>
            <p class="text-xl">
                グラフの性質<br/>
                上の図の内 <Katex>y = x^3</Katex> であると考えられるものを教えてください．
            </p>
        </span>
            <form method='post'>
                <button class='btn' name='answer' value='red'>Red</button>
                <button class='btn' name='answer' value='green'>green</button>
                <button class='btn' name='answer' value='blue'>blue</button>
            </form>
        </Quiz>
    {:else if data.course === 3}
        <Quiz questionnaire='回答を入力'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>数学鬼コース―3</h1>
			<p class="text-xl">
				<span>この小問ではすべて <Katex>12</Katex> 進数で表記される。ただし答えは <Katex>10</Katex> 進数で答えよ。<Katex>10!</Katex>の 4 桁目の値は？</span>
				<br/>
				<br/>
				<span>
					・補足<br/>
					<Katex>12</Katex>進数とは、<Katex>0,1,2,3,4,5,6,7,8,9,A,B</Katex> という 12 種類の記号を用いて数を表すことである。（10 進数では 0~9 の 10 種類である。）<br/>
					簡単に言うと、<Katex>n</Katex> 進数は下の位に <Katex>n</Katex> 個物が集まると次の位に繰り上がる表現方法である。<br/>
					例えば 12 進数での 13 は 10 進数での 15 である。（12+3=15）
				</span>
			</p>
        </span>
            <form method='post'>
                <input type='number' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
        </Quiz>
    {/if}

    <div class='hero min-h-screen fixed top-0 -z-10' slot="correct">
        <div class='hero-content text-center'>
            <div class='space-y-4'>
                {#if data.course === 1}
                    <img src="/images/quiz/EZ-3A.png">
                {:else if data.course === 2}
                    <h1 class='text-5xl font-bold'>
                        <Icon icon='mdi:check-circle-outline' class='inline-block mr-4' />
                        正解！
                    </h1>
                    <h1 class='text-3xl'>
                        2号館2階へ向かえ！
                    </h1>
                {:else if data.course === 3}
                    <h1 class='text-5xl font-bold'>
                        <Icon icon='mdi:check-circle-outline' class='inline-block mr-4' />
                        正解！
                    </h1>
                    <h1 class='text-3xl'>
                        2号館2階へ向かえ！
                    </h1>
                {/if}
            </div>
        </div>
    </div>
</QuizBase>