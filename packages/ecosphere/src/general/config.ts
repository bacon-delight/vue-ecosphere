import type { InjectionKey, Ref } from "vue";
import type { theme } from "../utilities/types.interface";

export type EpSize = "xs" | "sm" | "md" | "lg" | "xl";
export type EpLocale = string;

export interface EpConfig {
	theme: Ref<theme>;
	size: Ref<EpSize>;
	locale: Ref<EpLocale>;
}

export const EpConfigKey: InjectionKey<EpConfig> = Symbol("EpConfig");
