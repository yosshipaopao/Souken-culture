import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { participants } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

export const actions = {
	course: async ({ request, locals }) => {
		const db = drizzle(locals.DB);
		const session = await locals.getSession();
		if (!session?.user) throw error(401, 'Unauthorized');
		const formData = await request.formData();
		const course = formData.get('course');
		const redirectURL = formData.get('redirect');
		if (redirectURL instanceof File) throw error(400, 'Bad Request');
		let courseNumber: number = 0;
		switch (course) {
			case 'beginner':
				courseNumber = 1;
				break;
			case 'intermediate':
				courseNumber = 2;
				break;
			case 'advanced':
				courseNumber = 3;
				break;
			default:
				throw error(400, 'Bad Request');
		}
		const courseExists = await db
			.selectDistinct({
				course: participants.course
			})
			.from(participants)
			.where(eq(participants.userId, session?.user?.id));
		//todo check if course is already finished
		if (courseExists.length > 0) throw error(400, 'Already participated');

		await db.insert(participants).values({
			userId: session.user.id,
			course: courseNumber,
			start: new Date()
		});
		return {
			success: true,
			redirect: redirectURL ?? ''
		};
	}
} satisfies Actions;
