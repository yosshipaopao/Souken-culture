import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { answers, participants } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
export const actions: Actions = {
	default: async ({ locals, request }) => {
		const db = drizzle(locals.DB);
		const session = await locals.getSession();
		if (!session?.user) throw error(401, 'Unauthorized');
		const formData = await request.formData();
		const del = formData.get('delete');
		if (del) {
			await db.delete(answers).where(eq(answers.userId, session.user.id));
			await db.delete(participants).where(eq(participants.userId, session.user.id));
			return {
				success: true,
				message: 'Answers rested'
			};
		} else {
			return fail(400, {
				message: 'Bad Request'
			});
		}
	}
};
