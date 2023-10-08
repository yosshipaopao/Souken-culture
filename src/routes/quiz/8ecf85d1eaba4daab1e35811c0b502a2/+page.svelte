<script lang='ts'>
    import type {PageData, ActionData} from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';
    import Katex from "svelte-katex";
    import Icon from "@iconify/svelte";

    export let data: PageData;
    export let form: ActionData;
    const q = '8ecf85d1eaba4daab1e35811c0b502a2';
</script>
<QuizBase {form} answer={data.answer} {q}>
    {#if data.course === 1}
        <Quiz questionnaire='回答を入力' image="/images/quiz/EZ-5.png">
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
        <Quiz questionnaire='回答を選択' image="/images/quiz/IN-5.png">
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>Identity</h1>
            <p class="text-xl">むかしむかし，あるところに，何事につけ他の人と被るのを嫌がる厄介ヲタク集団がいました．かれらは体育の授業でフラフープをやることになりましたが，かれらは厄介ヲタクなので他の人と同じデザインのフラフープを使えません．そのフラフープは組み立て式で，白か黒に塗られた，6つの円弧状の部品から成っています．この集団は最大何人で構成されているか考えてください．例えば，ヲタク達は上の図のような3つのデザインを同じと見做します．</p>
        </span>
            <form method='post'>
                <!--選択肢的な例-->
                <input type='number' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
        </Quiz>
    {:else if data.course === 3}
        <Quiz questionnaire='回答を入力'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>数学鬼コース―5</h1>
            <p class="text-xl">
				<span>二桁の自然数 <Katex>AB</Katex>(<Katex>AB</Katex> ≧ 50 )がある。</span><br/>
				<span>また、<Katex>AB</Katex> の一の位と十の位を入れ替えてできる二桁の自然数を <Katex>BA</Katex> とする。</span><br/>
				<span>このとき、<Katex>AB</Katex> × <Katex>BA</Katex> = 3478 となる <Katex>AB</Katex> は⑥である</span>
			</p>
            <label for="hint" class="btn">hint</label>
        </span>
            <form method='post'>
                <input type='number' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
            <input type="checkbox" id="hint" class="modal-toggle"/>
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">素因数分解してもできるけどしなくてもできるようになってるよ～</h3>
                    <div class="modal-action">
                        <label for="hint" class="btn btn-secondary">Close</label>
                    </div>
                </div>
            </div>
        </Quiz>
    {:else if data.course === 4}
        <Quiz questionnaire='回答を入力' image="/images/quiz/NZ-5.png">
        <span slot='quiz'>
			※ひらがなで答えてください
            <label for="hint" class="btn btn-secondary">hint</label>
        </span>
            <form method='post' class='space-x-4 space-y-2'>
                <!--実際に入力する例-->
                <input type='text' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
            <input type="checkbox" id="hint" class="modal-toggle"/>
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">・車の部品、、、</h3>
                    <h3 class="font-bold text-lg">・イラストがかなりのヒント</h3>
                    <div class="modal-action">
                        <label for="hint" class="btn">Close</label>
                    </div>
                </div>
            </div>
        </Quiz>

    {/if}

    <div class='hero min-h-screen fixed top-0 -z-10' slot="correct">
        <div class='hero-content text-center'>
            <div class='space-y-4'>
                <h1 class='text-5xl font-bold'>
                    <Icon icon='mdi:check-circle-outline' class='inline-block mr-4'/>
                    正解！
                </h1>
                <h1 class='text-3xl'>
                    見逃してる問題あります！
                </h1>
            </div>
        </div>
    </div>
</QuizBase>