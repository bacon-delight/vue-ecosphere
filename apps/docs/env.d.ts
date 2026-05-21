/// <reference types="vite/client" />

// Ambient stubs for the lightweight i18n shim in apps/docs/src/main.ts.
// vue-i18n was removed in M0; templates still reference $t/$te/$tc, so
// we declare them as no-op globals to satisfy vue-tsc.
declare module "vue" {
	interface ComponentCustomProperties {
		$t: (key: string, ...args: unknown[]) => string;
		$te: (key: string) => boolean;
		$tc: (key: string, ...args: unknown[]) => string;
	}
}

export {};
