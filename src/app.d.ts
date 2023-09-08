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

export {};
