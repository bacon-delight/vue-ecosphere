import type { App } from "vue";

// Call to Action
import ButtonComponent from "./call-to-action/ButtonComponent.vue";
import LinkComponent from "./call-to-action/LinkComponent.vue";

// Data Entry
import CheckboxField from "./data-entry/CheckboxField.vue";
import CheckboxGroup from "./data-entry/CheckboxGroup.vue";
import ChoiceChips from "./data-entry/ChoiceChips.vue";
import ColorPicker from "./data-entry/ColorPicker.vue";
import InputField from "./data-entry/InputField.vue";
import InputNumberField from "./data-entry/InputNumberField.vue";
import RadioField from "./data-entry/RadioField.vue";
import RadioGroup from "./data-entry/RadioGroup.vue";
import SelectField from "./data-entry/SelectField.vue";
import SwitchComponent from "./data-entry/SwitchComponent.vue";
import TextareaField from "./data-entry/TextareaField.vue";

// General
import SVGIcon from "./general/SVGIcon.vue";
import EpConfigProvider from "./general/EpConfigProvider.vue";

// Miscellaneous
import AvatarComponent from "./miscellaneous/AvatarComponent.vue";
import AvatarGroup from "./miscellaneous/AvatarGroup.vue";
import StepperComponent from "./miscellaneous/StepperComponent.vue";
import TagComponent from "./miscellaneous/TagComponent.vue";

// Navigation
import BreadcrumbNavigation from "./navigation/BreadcrumbNavigation.vue";
import MenuNavigation from "./navigation/MenuNavigation.vue";
import NavigationBar from "./navigation/NavigationBar.vue";
import SidebarNavigation from "./navigation/SidebarNavigation.vue";
import TabNavigation from "./navigation/TabNavigation.vue";

/**
 * Register all Ecosphere components on a Vue application using the
 * `Ep*` PascalCase naming convention. Vue also exposes a kebab-case
 * alias automatically (e.g. `<ep-button>`).
 */
export default function registerPluginComponents(app: App) {
	// Call to Action
	app.component("EpButton", ButtonComponent);
	app.component("EpLink", LinkComponent);

	// Data Entry
	app.component("EpCheckbox", CheckboxField);
	app.component("EpCheckboxGroup", CheckboxGroup);
	app.component("EpChoiceChips", ChoiceChips);
	app.component("EpColorPicker", ColorPicker);
	app.component("EpInput", InputField);
	app.component("EpInputNumber", InputNumberField);
	app.component("EpRadio", RadioField);
	app.component("EpRadioGroup", RadioGroup);
	app.component("EpSelect", SelectField);
	app.component("EpSwitch", SwitchComponent);
	app.component("EpTextarea", TextareaField);

	// General
	app.component("EpIcon", SVGIcon);
	app.component("EpConfigProvider", EpConfigProvider);

	// Miscellaneous
	app.component("EpAvatar", AvatarComponent);
	app.component("EpAvatarGroup", AvatarGroup);
	app.component("EpStepper", StepperComponent);
	app.component("EpTag", TagComponent);

	// Navigation
	app.component("EpBreadcrumb", BreadcrumbNavigation);
	app.component("EpMenu", MenuNavigation);
	app.component("EpNavbar", NavigationBar);
	app.component("EpSidebar", SidebarNavigation);
	app.component("EpTabNavigation", TabNavigation);
}
