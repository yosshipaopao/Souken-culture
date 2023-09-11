import type { LayoutServerLoad } from './$types';
import { answers, participants, results } from '$lib/schema';
import { error, redirect } from '@sveltejs/kit';
import { asc, desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

export const load: LayoutServerLoad = async ({ parent, locals, request }) => {
	const db = drizzle(locals.DB);
	const parentData = await parent();

	const answerRaw = await db
		.selectDistinct({
			question: answers.question,
			isCorrect: answers.isCorrect
		})
		.from(answers)
		.where(eq(answers.userId, parentData.session?.user?.id ?? ''))
		.orderBy(asc(answers.createdAt));
	const quizLength = 5;
	const answer: {
		question: string;
		isCorrect: boolean;
	}[] = [];
	answerRaw.forEach((v) => {
		if (!answer.find((w) => v.question == w.question)) {
			answer.push({
				question: v.question,
				isCorrect: !!answerRaw.find((w) => v.question === w.question && w.isCorrect)
			});
		}
	});
	for (let i = answer.length; i < quizLength; i++) {
		answer.push({
			question: '',
			isCorrect: false
		});
	}
	//全問正解は強制リダイレクト

	const participant = await db
		.selectDistinct({
			course: participants.course,
			start: participants.start
		})
		.from(participants)
		.where(eq(participants.userId, parentData.session?.user?.id ?? ''))
		.get();
	if (answer.length == quizLength && answer.every((v) => v.isCorrect)) {
		if (!new URL(request.url).pathname.endsWith('final')) throw redirect(302, '/quiz/final');
	}
	const doneCourses = await db.selectDistinct({course:results.course}).from(results).where(eq(results.userId,parentData.session?.user?.id??'')).then(v=>v.map(v=>v.course));
	const start = participant?.start;
	const status = !participant ? 'notStarted' : 'started';
	const course = !participant ? null : participant.course;
	return {
		answer,
		status,
		course,
		start,
		doneCourses
	};
};