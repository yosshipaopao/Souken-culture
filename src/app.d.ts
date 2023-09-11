// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			DB: D1Database;
		}

		// interface PageData {}
		interface Platform {
			env: {
				DB: D1Database;
			};
		}
	}
}

//
declare module '@auth/core/types' {
	interface Session {
		user?: {
			name: string;
			email: string | null;
			image: string;
			id: string;
		};
		expires?: string;
	}
}

export {};
