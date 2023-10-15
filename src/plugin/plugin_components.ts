// Call to Action
import ButtonComponent from "./call-to-action/ButtonComponent.vue";
import LinkComponent from "./call-to-action/LinkComponent.vue";

// Data Entry
import CheckboxField from "./data-entry/CheckboxField.vue";
import CheckboxGroup from "./data-entry/CheckboxGroup.vue";
import ChoiceChips from "./data-entry/ChoiceChips.vue";
import ColorPicker from "./data-entry/ColorPicker.vue";
import DropdownField from "./data-entry/DropdownField.vue";
import InputField from "./data-entry/InputField.vue";
import RadioField from "./data-entry/RadioField.vue";
import RadioGroup from "./data-entry/RadioGroup.vue";
import SearchDropdown from "./data-entry/SearchDropdown.vue";
import SwitchComponent from "./data-entry/SwitchComponent.vue";
import TextareaField from "./data-entry/TextareaField.vue";

// General
import SVGIcon from "./general/SVGIcon.vue";

// Miscellaneous
import AvatarComponent from "./miscellaneous/AvatarComponent.vue";
import StepperComponent from "./miscellaneous/StepperComponent.vue";
import TagComponent from "./miscellaneous/TagComponent.vue";

// Navigation
import BreadcrumbNavigation from "./navigation/BreadcrumbNavigation.vue";
import MenuNavigation from "./navigation/MenuNavigation.vue";
import NavigationBar from "./navigation/NavigationBar.vue";
import SidebarNavigation from "./navigation/SidebarNavigation.vue";
import TabNavigation from "./navigation/TabNavigation.vue";

export default function registerPluginComponents(app: any) {
	// Call to Action
	app.component("v-eco-button", ButtonComponent);
	app.component("v-eco-link", LinkComponent);

	// Data Entry
	app.component("v-eco-checkbox", CheckboxField);
	app.component("v-eco-checkbox-group", CheckboxGroup);
	app.component("v-eco-choice-chips", ChoiceChips);
	app.component("v-eco-color-picker", ColorPicker);
	app.component("v-eco-dropdown", DropdownField);
	app.component("v-eco-input", InputField);
	app.component("v-eco-radio", RadioField);
	app.component("v-eco-radio-group", RadioGroup);
	app.component("v-eco-search-dropdown", SearchDropdown);
	app.component("v-eco-switch", SwitchComponent);
	app.component("v-eco-textarea", TextareaField);

	// General
	app.component("v-eco-icon", SVGIcon);

	// Miscellaneous
	app.component("v-eco-avatar", AvatarComponent);
	app.component("v-eco-stepper", StepperComponent);
	app.component("v-eco-tag", TagComponent);

	// Navigation
	app.component("v-eco-breadcrumb", BreadcrumbNavigation);
	app.component("v-eco-menu", MenuNavigation);
	app.component("v-eco-navbar", NavigationBar);
	app.component("v-eco-sidebar", SidebarNavigation);
	app.component("v-eco-tab-navigation", TabNavigation);
}
