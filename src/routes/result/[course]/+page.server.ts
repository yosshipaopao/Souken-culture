import type { PageServerLoad } from './$types';
import { drizzle } from 'drizzle-orm/d1';
import { results, users } from '$lib/schema';
import { and, asc, eq, isNotNull } from 'drizzle-orm';

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

	const fastest = await db
		.select({
			name: users.name,
			image: users.image,
			total: results.totalTime
		})
		.from(results)
		.where(and(eq(results.course, reqCourse), isNotNull(results.totalTime)))
		.orderBy(asc(results.totalTime)).limit(5)
		.leftJoin(users, eq(users.id, results.userId));

	return {
		yourResult: yourResult?.end ? yourResult : null,
		fastest,
		course: reqCourse
	};
};
