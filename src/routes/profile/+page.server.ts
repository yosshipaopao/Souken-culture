import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { users } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
export const actions: Actions = {
	default: async ({ locals, request }) => {
		const db = drizzle(locals.DB);
		const session = await locals.getSession();
		if (!session?.user) throw error(401, 'Unauthorized');
		const formData = await request.formData();
		const name = formData.get('name');
		if (name instanceof File) throw error(400, 'Bad Request');
		await db
			.update(users)
			.set({
				name: name ?? ''
			})
			.where(eq(users.id, session.user.id));
		return {
			success: true,
			message: 'Name updated'
		};
	}
};
