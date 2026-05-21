// Token pipeline — design tokens as CSS custom properties (--ep-*).
// These two CSS imports are inlined into the lib's bundled stylesheet by Vite.
import "@ecosphere/tokens/css";
import "@ecosphere/tokens/css/dark";

// Components
import ButtonComponent from "./call-to-action/ButtonComponent.vue";
import LinkComponent from "./call-to-action/LinkComponent.vue";

import CheckboxField from "./data-entry/CheckboxField.vue";
import CheckboxGroup from "./data-entry/CheckboxGroup.vue";
import ChoiceChips from "./data-entry/ChoiceChips.vue";
import ColorPicker from "./data-entry/ColorPicker.vue";
import DropdownField from "./data-entry/DropdownField.vue";
import InputField from "./data-entry/InputField.vue";
import InputNumberField from "./data-entry/InputNumberField.vue";
import RadioField from "./data-entry/RadioField.vue";
import RadioGroup from "./data-entry/RadioGroup.vue";
import SearchDropdown from "./data-entry/SearchDropdown.vue";
import SwitchComponent from "./data-entry/SwitchComponent.vue";
import TextareaField from "./data-entry/TextareaField.vue";

import SVGIcon from "./general/SVGIcon.vue";
import EpConfigProviderComponent from "./general/EpConfigProvider.vue";

import AvatarComponent from "./miscellaneous/AvatarComponent.vue";
import AvatarGroup from "./miscellaneous/AvatarGroup.vue";
import StepperComponent from "./miscellaneous/StepperComponent.vue";
import TagComponent from "./miscellaneous/TagComponent.vue";

import BreadcrumbNavigation from "./navigation/BreadcrumbNavigation.vue";
import MenuNavigation from "./navigation/MenuNavigation.vue";
import NavigationBar from "./navigation/NavigationBar.vue";
import SidebarNavigation from "./navigation/SidebarNavigation.vue";
import TabNavigation from "./navigation/TabNavigation.vue";

// Plugin
import plugin from "./plugin";

// Re-export the plugin as the default export
export default plugin;

// PascalCase exports (Ep*)
export const EpButton = ButtonComponent;
export const EpLink = LinkComponent;
export const EpCheckbox = CheckboxField;
export const EpCheckboxGroup = CheckboxGroup;
export const EpChoiceChips = ChoiceChips;
export const EpColorPicker = ColorPicker;
export const EpDropdown = DropdownField;
export const EpInput = InputField;
export const EpInputNumber = InputNumberField;
export const EpRadio = RadioField;
export const EpRadioGroup = RadioGroup;
export const EpSearchDropdown = SearchDropdown;
export const EpSwitch = SwitchComponent;
export const EpTextarea = TextareaField;
export const EpIcon = SVGIcon;
export const EpConfigProvider = EpConfigProviderComponent;
export const EpAvatar = AvatarComponent;
export const EpAvatarGroup = AvatarGroup;
export const EpStepper = StepperComponent;
export const EpTag = TagComponent;
export const EpBreadcrumb = BreadcrumbNavigation;
export const EpMenu = MenuNavigation;
export const EpNavbar = NavigationBar;
export const EpSidebar = SidebarNavigation;
export const EpTabNavigation = TabNavigation;

// Original named exports (preserved for compatibility within this PR)
export {
	ButtonComponent,
	LinkComponent,
	CheckboxField,
	CheckboxGroup,
	ChoiceChips,
	ColorPicker,
	DropdownField,
	InputField,
	InputNumberField,
	RadioField,
	RadioGroup,
	SearchDropdown,
	SwitchComponent,
	TextareaField,
	SVGIcon,
	AvatarComponent,
	AvatarGroup,
	StepperComponent,
	TagComponent,
	BreadcrumbNavigation,
	MenuNavigation,
	NavigationBar,
	SidebarNavigation,
	TabNavigation,
};

// Public types
export * from "./utilities/types.interface";
export {
	EpConfigKey,
	type EpConfig,
	type EpSize,
	type EpLocale,
} from "./general/config";

// GlobalComponents type augmentation for template auto-completion
declare module "vue" {
	export interface GlobalComponents {
		EpButton: typeof ButtonComponent;
		EpLink: typeof LinkComponent;
		EpCheckbox: typeof CheckboxField;
		EpCheckboxGroup: typeof CheckboxGroup;
		EpChoiceChips: typeof ChoiceChips;
		EpColorPicker: typeof ColorPicker;
		EpDropdown: typeof DropdownField;
		EpInput: typeof InputField;
		EpInputNumber: typeof InputNumberField;
		EpRadio: typeof RadioField;
		EpRadioGroup: typeof RadioGroup;
		EpSearchDropdown: typeof SearchDropdown;
		EpSwitch: typeof SwitchComponent;
		EpTextarea: typeof TextareaField;
		EpIcon: typeof SVGIcon;
		EpConfigProvider: typeof EpConfigProviderComponent;
		EpAvatar: typeof AvatarComponent;
		EpAvatarGroup: typeof AvatarGroup;
		EpStepper: typeof StepperComponent;
		EpTag: typeof TagComponent;
		EpBreadcrumb: typeof BreadcrumbNavigation;
		EpMenu: typeof MenuNavigation;
		EpNavbar: typeof NavigationBar;
		EpSidebar: typeof SidebarNavigation;
		EpTabNavigation: typeof TabNavigation;
	}

	export interface ComponentCustomProperties {
		$ecosphere: import("./utilities/types.interface").ecosphere;
	}
}
