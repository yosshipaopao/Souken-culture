<script lang='ts'>
	import type { PageData, ActionData } from './$types';
	import Quiz from '$lib/components/quiz.svelte';
	import QuizBase from '$lib/components/quizBase.svelte';
	import Katex from "svelte-katex";
	import Icon from "@iconify/svelte";

	export let data: PageData;
	export let form: ActionData;
	const q = 'eaa930eded7648839a032a116880d817';
	let A= 0;
	let B= 0;
</script>
<QuizBase {form} answer={data.answer} {q}>
	{#if data.course === 1}
		<Quiz questionnaire='回答を入力' image="/images/quiz/EZ-2.png">
        <span slot='quiz'>
			※ひらがなで答えてください
        </span>
			<form method='post' class='space-x-4 space-y-2'>
				<!--実際に入力する例-->
				<input type='text' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
							 value={form?.answer??""} />
				<button class='btn btn-accent' type='submit'>送信</button>
			</form>
		</Quiz>
	{:else if data.course === 2}
		<Quiz questionnaire='回答を選択' image="/images/quiz/IN-2.png">
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>Anamnesis</h1>
            <p class="text-xl">立体から投影図を描く。<br/>
			斜めにした（直）円錐を（無限遠点からの）光で照らしたときにできる影を教えてほしいです．</p>
        </span>
			<form method='post'>
				<!--選択肢的な例-->
                <button class='btn' name='answer' value='A'>A</button>
                <button class='btn' name='answer' value='B'>B</button>
                <button class='btn' name='answer' value='C'>C</button>
                <button class='btn' name='answer' value='D'>D</button>
			</form>
		</Quiz>
	{:else if data.course === 3}
		<Quiz questionnaire='回答を入力' image="/images/quiz/Math-2-1.png">
			<span slot='quiz'>
				<h1 class='font-bold text-2xl'>数学鬼コース―2</h1>
				<p class="text-xl">
					<span>図 1 のように立方体<Katex>X</Katex> に内接している立体<Katex>Y</Katex> がある。（実線部）ただし、立体 <Katex>Y</Katex> の頂点はすべて立方体<Katex>X</Katex> の辺の中点である。この時、立方体 <Katex>X</Katex> と立体<Katex>Y</Katex> の体積比は<Katex>A:B</Katex>である。</span>
				</p>

                <label for="hint" class="btn">hint</label>
			</span>
			<form method='post' class="flex flex-col gap-2">
				<div class="join">
					<div class="join-item w-16 bg-warning flex items-center justify-center">A:</div>
					<input type='number' placeholder='A' class='join-item input input-bordered w-full max-w-xs'
							 bind:value={A} />
				</div>
				<div class="join">
					<div class="join-item w-16 bg-warning flex items-center justify-center">B:</div>
					<input type='number' placeholder='B' class='join-item input input-bordered w-full max-w-xs'
							 bind:value={B} />
				</div>
				<input type="hidden"  name='answer' value="{A}:{B}">
				<button type="submit" class="btn btn-secondary">確定</button>
			</form>
			<input type="checkbox" id="hint" class="modal-toggle"/>
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">簡単に体積が求められそうな形になるように切ってみると？</h3>
                    <div class="modal-action">
                        <label for="hint" class="btn btn-secondary">Close</label>
                    </div>
                </div>
            </div>
		</Quiz>
	{:else }
			<Quiz questionnaire='回答を入力' image="/images/quiz/NZ-2.png">
			<span slot='quiz'>
				<label for="hint" class="btn btn-secondary">hint</label>
			</span>
			<form method='post' class="flex flex-col gap-2">
				<input type='text' placeholder='Type here' name='answer' class='input input-bordered w-full max-w-xs'
							 value={form?.answer??""} />
				<button class='btn btn-accent' type='submit'>送信</button>
			</form>
				<input type="checkbox" id="hint" class="modal-toggle"/>
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">・化学は英語で！？</h3>
                    <h3 class="font-bold text-lg">・４文字の野菜、、、</h3>
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
                    <img src="/images/quiz/EZ-2A.png">
                {:else}
                    <h1 class='text-5xl font-bold'>
                        <Icon icon='mdi:check-circle-outline' class='inline-block mr-4' />
                        正解！
                    </h1>
                    <h1 class='text-3xl'>
                        1号館4階へ向かえ！
                    </h1>
                {/if}
            </div>
        </div>
    </div>
</QuizBase>