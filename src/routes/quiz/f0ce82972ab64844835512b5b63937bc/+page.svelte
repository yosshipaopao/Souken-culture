<script lang='ts'>
    import type {PageData, ActionData} from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';
    import Katex from "svelte-katex";
    import Icon from "@iconify/svelte";

    export let data: PageData;
    export let form: ActionData;
    const q = 'f0ce82972ab64844835512b5b63937bc';
</script>
<QuizBase {form} answer={data.answer} {q}>
    {#if data.course === 1}
        <Quiz questionnaire='回答を入力' image="/images/quiz/EZ-1.png">
        <span slot='quiz'>
            ※ひらがなで答えてください。
        </span>
            <form method='post' class='space-x-4 space-y-2'>
                <!--実際に入力する例-->
                <input type='text' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
        </Quiz>
    {:else if data.course === 2}
        <Quiz questionnaire='回答を選択' image="/images/quiz/IN-1.png">
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>Eros</h1>
            <p class="text-xl">投影図から立体を描く。</p>
            <img src="/images/quiz/IN-1-1.png" alt="Intermediate-1" class="w-full max-w-screen-2xl"/>
            <p class="text-xl">このように，上，前，右からある立体を見た時のカゲがつくとき，その立体は何かを考えます。例えば今回の場合は球が正解のひとつになります。</p>
            <p class="text-2xl">上の画像の中で一つ間違えた画像が混ざりこんでしまいました。どれでしょう？</p>
        </span>
            <form method='post'>
                <!--選択肢的な例-->
                <button class='btn' name='answer' value='A'>A</button>
                <button class='btn' name='answer' value='B'>B</button>
                <button class='btn' name='answer' value='C'>C</button>
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


    <div class='hero min-h-screen fixed top-0 -z-10' slot="correct">
        <div class='hero-content text-center'>
            <div class='space-y-4'>
                {#if data.course === 1}
                    <img src="/images/quiz/EZ-1A.png">
                {:else if data.course === 2}
                    <h1 class='text-5xl font-bold'>
                        <Icon icon='mdi:check-circle-outline' class='inline-block mr-4' />
                        正解！
                    </h1>
                    <h1 class='text-3xl'>
                        1号館3階へ向かえ！
                    </h1>
                {:else if data.course === 3}
                    <h1 class='text-5xl font-bold'>
                        <Icon icon='mdi:check-circle-outline' class='inline-block mr-4' />
                        正解！
                    </h1>
                    <h1 class='text-3xl'>
                        1号館3階へ向かえ！
                    </h1>
                {/if}
            </div>
        </div>
    </div>
</QuizBase>
