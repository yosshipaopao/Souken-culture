import { SECRET, GOOGLE_ID, GOOGLE_SECRET, DISCORD_ID, DISCORD_SECRET } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import type { Handle } from '@sveltejs/kit';
import { AuthAdapter } from '$lib/server/Adapter';
import { drizzle } from 'drizzle-orm/d1';
import { sequence } from '@sveltejs/kit/hooks';
import { createBridge } from 'cfw-bindings-wrangler-bridge';

const theme = (async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') ?? '';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace("data-theme=''", `data-theme='${theme}'`)
	});
}) satisfies Handle;

const DB = (async ({ event, resolve }) => {
	event.locals.DB = event.platform?.env.DB ?? createBridge().D1Database('DB');
	return resolve(event);
}) satisfies Handle;
const auth = SvelteKitAuth(async ({ locals }) => {
	const db = drizzle(locals.DB);
	return {
		adapter: AuthAdapter(db),
		providers: [
			Discord({ clientId: DISCORD_ID, clientSecret: DISCORD_SECRET }),
			Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
		],
		secret: SECRET,
		trustHost: true,
		callbacks: {
			session: async ({ session, user }) => {
				if (session.user) session.user.id = user.id;
				return session as {
					user: {
						name?: string | null | undefined;
						email?: string | null | undefined;
						image?: string | null | undefined;
						id?: string | null | undefined;
					};
					expires: string;
				};
			}
		},
		pages: {
			signIn: '/signIn'
		}
	};
}) satisfies Handle;

export const handle = sequence(theme, DB, auth);
