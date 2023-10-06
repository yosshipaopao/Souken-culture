<script lang='ts'>
    import type {PageData, ActionData} from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';
    import Katex from "svelte-katex";

    export let data: PageData;
    export let form: ActionData;
    const q = '8ecf85d1eaba4daab1e35811c0b502a2';
</script>
<QuizBase {form} answer={data.answer} {q}>
    {#if data.course === 1}
        <Quiz questionnaire='回答を入力'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>初級用問題文</h1>
            <p>より詳細な問題文、、、、、、、、、、、、、</p>
        </span>
            <form method='post' class='space-x-4 space-y-2'>
                <!--実際に入力する例-->
                <input type='text' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
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
        <Quiz questionnaire='回答を入力' image="/images/quiz/Math-1-1.png">
            <span slot='quiz'>
                <h1 class='font-bold text-2xl'>数学鬼コース―1</h1>
                <p class="text-xl">
                    <span><Katex>(n ^ n) ^ n ≡ 7 ( mod 10 ) </Katex>となる素数 <Katex>n</Katex> のうち５番目に小さい <Katex>n</Katex>を答えよ。</span><br/>
                    <span>※1 表 1 は <Katex>a^b</Katex> の下一桁を <Katex>a</Katex> を縦に <Katex>b</Katex> を横にしてまとめたものの一部である。</span>
                    <br/>
                    <br/>
                    <span>補足<br/>
                        <Katex>mod</Katex> とは、割り算のあまりに注目した式です。
                            <Katex>A ≡ B( mod C)</Katex>
                        とは、<Katex>A</Katex> と <Katex>B</Katex> を <Katex>C</Katex> で割った余りが等しいということを示します。
                            また、一般に知られる <Katex>mod</Katex> の公式は以下の通りです。<br/>
                        <Katex>A ≡ B</Katex>, <Katex>C ≡ D</Katex>のとき、<Katex>A + C ≡ B + D</Katex><br/>
                        <Katex>A ≡ B</Katex>, <Katex>C ≡ D</Katex>のとき、<Katex>A - C ≡ B - D</Katex><br/>
                        <Katex>A ≡ B</Katex>, <Katex>C ≡ D</Katex>のとき、<Katex>AC ≡ BD</Katex><br/>
                        <Katex>A ≡ B</Katex>のとき、<Katex>Ak ≡ B</Katex><br/>
                    </span>
                </p>
            </span>
            <form method='post'>
               <input type='number' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>

            </form>
        </Quiz>
    {/if}
</QuizBase>