<script lang='ts'>
	import type { PageData, ActionData } from './$types';
	import Quiz from '$lib/components/quiz.svelte';
	import QuizBase from '$lib/components/quizBase.svelte';
	import Katex from "svelte-katex";

	export let data: PageData;
	export let form: ActionData;
	const q = '30ce89e815d0490d90a0ec6fd6b759fe';


	let A=0;
	let B=0;
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
		<Quiz questionnaire='回答を入力' image="/images/quiz/Math-2-1.png">
			<span slot='quiz'>
				<h1 class='font-bold text-2xl'>数学鬼コース―2</h1>
				<p>
					<span>図 1 のように立方体<Katex>X</Katex> に内接している立体<Katex>Y</Katex> がある。（実線部）ただし、立体 <Katex>Y</Katex> の頂点はすべて立方体<Katex>X</Katex> の辺の中点である。この時、立方体 <Katex>X</Katex> と立体<Katex>Y</Katex> の体積比は<Katex>A:B</Katex>である。</span>
				</p>
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
		</Quiz>
	{/if}
</QuizBase>