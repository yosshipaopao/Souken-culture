import type { PageServerLoad } from './$types';
import { drizzle } from 'drizzle-orm/d1';
import { results } from '$lib/schema';
import { and,  eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, parent ,params}) => {
	const { session } = await parent();
	const id = (session?.user?.id as string | undefined) ?? 'not signedIn user';
	const db = drizzle(locals.DB);
	let reqCourse =Number(params.course);

	if (isNaN(reqCourse)) reqCourse = 1;
	const yourResult = await db
		.select({
			course: results.course,
			total: results.totalTime,
			start: results.start,
			end: results.end,
			penalty: results.penalty
		})
		.from(results)
		.where(and(eq(results.userId, id), eq(results.course, reqCourse)))
		.get();
	
	return {
		yourResult: yourResult?.end ? yourResult : null,
		course: reqCourse
	};
};
