import type { PageServerLoad } from './$types';
import { drizzle } from 'drizzle-orm/d1';
import { participants, answers } from '$lib/schema';
import {and, asc, desc, eq, isNotNull, sql} from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { session } = await parent();
	const db = drizzle(locals.DB);

	const pas= await db.select({
		user: participants.userId,
		course: participants.course,
	}).from(participants)

	const p_data=pas.map(async (p)=>{
		const tryed = await db.select({
			correct: sql<number>`count(*)`
		}).from(answers).where(eq(answers.userId,p.user)).get().then((d)=>d?.correct??0);

		const count = await db.select({
			correct: sql<number>`count(*)`
		}).from(answers).where(and(eq(answers.userId,p.user),eq(answers.isCorrect,true))).get().then((d)=>d.correct??0);

		const last_answer = await db.select({
			answer: answers.answer,
			quiz:answers.question
		}).from(answers).where(eq(answers.userId,p.user)).orderBy(desc(answers.createdAt)).limit(1).get().then((d)=>{
			if(!d) return ["",""]
			return [d.answer,d.quiz]
		});
		return [p.user,p.course,last_answer[1],tryed,count,last_answer[0]]
	});

	const data:(string|number)[][] = []
	for await (const d of p_data) {
		data.push(d)
	}

	return {
		data
	};
};
