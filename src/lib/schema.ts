import {sqliteTable, integer, text, primaryKey, index, uniqueIndex} from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { sql } from 'drizzle-orm';

export const results = sqliteTable(
	'result',
	{
		userId: text('userId').references(() => users.id, { onDelete: 'set null' }),
		course: integer('course').notNull(),
		totalTime: integer('totalTime').notNull(),
		start: integer('start', { mode: 'timestamp_ms' }).notNull(),
		end: integer('end', { mode: 'timestamp_ms' }).notNull(),
		penalty: integer('penalty').notNull()
	},
	(vt) => {
		return {
			compoundKey: primaryKey(vt.userId, vt.course),
			totalIndex: index("total").on(vt.totalTime)
		};
	}
);

export const participants = sqliteTable('participant', {
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	start: integer('start', { mode: 'timestamp_ms' }).notNull(),
	course: integer('course').notNull()
}, (vt) => ({
	uidIndex: index("uid_idx").on(vt.userId, vt.course),
}));

export const answers = sqliteTable('answer', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	question: text('question').notNull(),
	userId: text('userId')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	answer: text('answer').notNull(),
	isCorrect: integer('isCorrect', { mode: 'boolean' }).notNull(),
	createdAt: integer('createdAt', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(strftime('%s','now'))`)
});
export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image')
}, (vt) => ({
	uidIndex: uniqueIndex("uid_index").on(vt.id),
}));

export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId)
	})
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
);
