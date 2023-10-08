<script lang='ts'>
    import type {PageData, ActionData} from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';
    import Katex from "svelte-katex";
    import Icon from "@iconify/svelte";

    export let data: PageData;
    export let form: ActionData;
    const q = '30ce89e815d0490d90a0ec6fd6b759fe';

</script>
<QuizBase {form} answer={data.answer} {q}>
    {#if data.course === 1}
        <Quiz questionnaire='回答を入力' image="/images/quiz/EZ-4.png">
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
        <Quiz questionnaire='回答を選択' image="/images/quiz/IN-4.png">
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>面積比</h1>
            <p class="text-xl">線分<Katex>AB</Katex>を2倍に延長して線分<Katex>AB'</Katex>にしました．同じように<Katex>C', A'</Katex> を定めます．三角形<Katex>A'B'C'</Katex>の面積は三角形<Katex>ABC</Katex>に比べて，いったいどれくらい大きくなってしまったというのか．</p>
        </span>
            <form method='post'>
                <!--選択肢的な例-->
                <input type='number' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>倍</button>
            </form>
        </Quiz>
    {:else if data.course === 3}
        <Quiz questionnaire='回答を入力' image="/images/quiz/Math-4-1.png">
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>数学鬼コース―4</h1>
            <p class="text-xl">
				<span>次の式の A の値</span>
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
                    <h3 class="font-bold text-lg">Aの中をAで表せそうな？</h3>
                    <div class="modal-action">
                        <label for="hint" class="btn btn-secondary">Close</label>
                    </div>
                </div>
            </div>
        </Quiz>
    {:else if data.course === 4}
        <Quiz questionnaire='回答を入力' image="/images/quiz/NZ-4.png">
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
                    <h3 class="font-bold text-lg">・イラストがかなりのヒント</h3>
                    <h3 class="font-bold text-lg">・爆発するときどんな音がする！？</h3>
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
                {#if data.course === 1}
                    <img src="/images/quiz/EZ-4A.png">
                {:else}
                    <h1 class='text-5xl font-bold'>
                        <Icon icon='mdi:check-circle-outline' class='inline-block mr-4'/>
                        正解！
                    </h1>
                    <h1 class='text-3xl'>
                        2号館の
                    </h1>
                    <img src="/images/quiz/EZ-4A.png">
                {/if}
            </div>
        </div>
    </div>
</QuizBase>