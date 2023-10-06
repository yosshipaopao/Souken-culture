import type { Actions, PageServerLoad } from './$types';
import { drizzle } from 'drizzle-orm/d1';
import { error, fail } from '@sveltejs/kit';
import { answers, participants } from '$lib/schema';
import { eq } from 'drizzle-orm';

//ここを変更
const q = 'f0ce82972ab64844835512b5b63937bc';
const ans: {
	[key: number]: string;
} = {
	1: 'にしんすう',
	2: 'B',
	3: '43'
};
//ここを

export const load: PageServerLoad = async ({ locals, parent }) => {
	const data = await parent();
	if (data.session?.user?.id && !data.answer.find((v) => v.question === q)) {
		const db = drizzle(locals.DB);
		await db.insert(answers).values({
			question: q,
			userId: data.session.user.id,
			answer: '',
			isCorrect: false
		});
	}
	return {};
};
export const actions: Actions = {
	default: async ({ request, locals }) => {
		const db = drizzle(locals.DB);

		const session = await locals.getSession();
		if (!session?.user) throw error(401, 'Unauthorized');
		const formData = await request.formData();

		const answer = formData.get('answer');
		if (answer instanceof File) throw error(400, 'Bad request');
		if (!answer) throw error(400, 'answer is required');

		const course = await db
			.select({
				course: participants.course
			})
			.from(participants)
			.where(eq(participants.userId, session.user.id))
			.get()
			.then((v) => v?.course);
		if (!course) throw error(400, 'You are not enrolled in any course');
		if (!(course in ans)) throw error(400, 'You are not enrolled in any course');

		if (ans[course] !== answer) {
			await db.insert(answers).values({
				question: q,
				userId: session.user.id,
				answer,
				isCorrect: false
			});

			return fail(400, {
				answer,
				message: 'Wrong answer'
			});
		} else {
			await db.insert(answers).values({
				question: q,
				userId: session.user.id,
				answer,
				isCorrect: true
			});
			return { success: true };
		}
	}
};
