<script lang='ts'>
    import type {PageData, ActionData} from './$types';
    import Quiz from '$lib/components/quiz.svelte';
    import QuizBase from '$lib/components/quizBase.svelte';

    export let data: PageData;
    export let form: ActionData;
    const q = 'final';

</script>
<input type="checkbox" id="finalModal" class="modal-toggle" checked={true}/>
<div class="modal z-50">
    <div class="modal-box">
        <h3 class="text-lg font-bold">正解！</h3>
        <p class="py-4">最終問題です！！！</p>
    </div>
    <label class="modal-backdrop" for="finalModal">Close</label>
</div>
<QuizBase {form} {q}>
    {#if data.course === 1}
        <Quiz questionnaire='回答を入力' image="/images/quiz/EZ-F.png">
        <span slot='quiz'>
            ※ひらがなで答えてください
        </span>
            <form method='post' class='space-x-4 space-y-2'>
                <!--実際に入力する例-->
                <input type='text' placeholder='Type here' name='answer'
                       class='input input-bordered w-full max-w-xs'
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
        <Quiz questionnaire='回答を入力' image="/images/quiz/Math-F.png">
        <span slot='quiz'>
            <p class="text-xl">今まで求めた①〜⑥を次のように並べた数字の列を上の表を基に文字に変換した結果を答えよ。<br/><br/>
                1問目:43<br/>
                2問目:6 , 1<br/>
                3問目:0<br/>
                4問目:4<br/>
                5問目:74<br/>
            </p>
        </span>
            <form method='post'>
                <input type='text' placeholder='Type here' name='answer'
                       class='input input-bordered w-full max-w-xs'
                       value={form?.answer??""}/>
                <button class='btn btn-accent' type='submit'>送信</button>
            </form>
        </Quiz>
    {/if}
</QuizBase>