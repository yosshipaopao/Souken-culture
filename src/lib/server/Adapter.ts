import { and, eq } from 'drizzle-orm';
import { accounts, sessions, users, verificationTokens } from '$lib/schema';
import type { Adapter, AdapterAccount } from '@auth/core/adapters';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

export const AuthAdapter = (client: DrizzleD1Database): Adapter => {
	return {
		createUser(data) {
			return client
				.insert(users)
				.values({ ...data, id: crypto.randomUUID() })
				.returning()
				.get();
		},
		getUser(data) {
			return client
				.select()
				.from(users)
				.where(eq(users.id, data))
				.get()
				.then((v) => v ?? null);
		},
		getUserByEmail(data) {
			return client
				.select()
				.from(users)
				.where(eq(users.email, data))
				.get()
				.then((v) => v ?? null);
		},
		createSession(data) {
			return client.insert(sessions).values(data).returning().get();
		},
		async getSessionAndUser(data) {
			return client
				.select({
					session: sessions,
					user: users
				})
				.from(sessions)
				.where(eq(sessions.sessionToken, data))
				.innerJoin(users, eq(users.id, sessions.userId))
				.get()
				.then((v) => v ?? null);
		},
		updateUser(data) {
			if (!data.id) {
				throw new Error('No user id.');
			}

			return client.update(users).set(data).where(eq(users.id, data.id)).returning().get();
		},
		updateSession(data) {
			return client
				.update(sessions)
				.set(data)
				.where(eq(sessions.sessionToken, data.sessionToken))
				.returning()
				.get();
		},
		async linkAccount(rawAccount) {
			const updatedAccount = await client.insert(accounts).values(rawAccount).returning().get();

			const account: AdapterAccount = {
				...updatedAccount,
				type: updatedAccount.type,
				access_token: updatedAccount.access_token ?? undefined,
				token_type: updatedAccount.token_type ?? undefined,
				id_token: updatedAccount.id_token ?? undefined,
				refresh_token: updatedAccount.refresh_token ?? undefined,
				scope: updatedAccount.scope ?? undefined,
				expires_at: updatedAccount.expires_at ?? undefined,
				session_state: updatedAccount.session_state ?? undefined
			};

			return account;
		},
		getUserByAccount(account) {
			return client
				.select()
				.from(accounts)
				.leftJoin(users, eq(users.id, accounts.userId))
				.where(
					and(
						eq(accounts.provider, account.provider),
						eq(accounts.providerAccountId, account.providerAccountId)
					)
				)
				.get()
				.then((v) => v?.user ?? null);
		},
		deleteSession(sessionToken) {
			return (
				client.delete(sessions).where(eq(sessions.sessionToken, sessionToken)).returning().get() ??
				null
			);
		},
		createVerificationToken(token) {
			return client.insert(verificationTokens).values(token).returning().get();
		},
		useVerificationToken(token) {
			try {
				return client
					.delete(verificationTokens)
					.where(
						and(
							eq(verificationTokens.identifier, token.identifier),
							eq(verificationTokens.token, token.token)
						)
					)
					.returning()
					.get()
					.then((v) => v ?? null);
			} catch (err) {
				throw new Error('No verification token found.');
			}
		},
		deleteUser(id) {
			return client.delete(users).where(eq(users.id, id)).returning().get();
		},
		unlinkAccount(account) {
			client
				.delete(accounts)
				.where(
					and(
						eq(accounts.providerAccountId, account.providerAccountId),
						eq(accounts.provider, account.provider)
					)
				)
				.run();

			return undefined;
		}
	};
};
