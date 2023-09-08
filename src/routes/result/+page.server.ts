import type { PageServerLoad } from './$types';
import { drizzle } from 'drizzle-orm/d1';
import { participants, users } from '$lib/schema';
import { and, asc, eq, isNotNull } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, parent, request }) => {
	const { session } = await parent();
	const id = (session?.user?.id as string | undefined) ?? 'not signedIn user';
	const db = drizzle(locals.DB);
	const yourResult = await db
		.select({
			start: participants.start,
			end: participants.end,
			total: participants.totalTime,
			course: participants.course
		})
		.from(participants)
		.where(eq(participants.userId, id))
		.get();

	let reqCourse = parseInt(
		new URL(request.url).searchParams.get('course') ?? yourResult?.course?.toString() ?? '1'
	);
	if (isNaN(reqCourse)) reqCourse = 1;

	const fastest = await db
		.select({
			name: users.name,
			image: users.image,
			total: participants.totalTime
		})
		.from(participants)
		.where(and(eq(participants.course, reqCourse), isNotNull(participants.totalTime)))
		.leftJoin(users, eq(users.id, participants.userId))
		.orderBy(asc(participants.totalTime));

	return {
		yourResult: yourResult?.end ? yourResult : null,
		fastest
	};
};
