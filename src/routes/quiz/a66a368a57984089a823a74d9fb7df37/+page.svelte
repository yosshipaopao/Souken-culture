<script lang='ts'>
	import type { PageData, ActionData } from './$types';
	import Quiz from '$lib/components/quiz.svelte';
	import QuizBase from '$lib/components/quizBase.svelte';
	import Katex from "svelte-katex";

	export let data: PageData;
	export let form: ActionData;
	const q = 'a66a368a57984089a823a74d9fb7df37';
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
		<Quiz questionnaire='回答を入力'>
        <span slot='quiz'>
            <h1 class='font-bold text-2xl'>数学鬼コース―3</h1>
			<p>
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
							 value={form?.answer??""} />
				<button class='btn btn-accent' type='submit'>送信</button>
			</form>
		</Quiz>
	{/if}
</QuizBase>