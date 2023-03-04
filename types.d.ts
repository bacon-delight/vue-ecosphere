export {};
import { ecosphere } from "@/plugin/utilities/types.interface";

declare module "vue" {
	interface ComponentCustomProperties {
		$ecosphere: ecosphere;
	}
}
