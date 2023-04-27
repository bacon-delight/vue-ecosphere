#### Use Case

This component renders a stepper that can help users get an overview of a process that has multuple steps involved

#### API

| Property      | Description                                                                                                       | Type                                          | Default              |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------- |
| `current`     | The current step in the stepper, ranges from `0` to `steps.length - 1`                                            | `number`                                      | `0`                  |
| `responsive`  | Converts a `horizontal` stepper to `vertical` when the available size is not sufficient to render it horizontally | `boolean`                                     | `true` (Recommended) |
| `hue`         | Applies a hue to the current step if state is `in-progress`                                                       | [`hue-limited`](/types#hue-limited)           | `information`        |
| `steps`       | Describes the steps of the stepper                                                                                | [`stepper_step[]`](#stepper-step)             | Required             |
| `orientation` | Orientation of the stepper                                                                                        | [`stepper_orientation`](#stepper-orientation) | `horizontal`         |
| `state`       | State of the current step in the stepper                                                                          | [`stepper_state`](#stepper-state)             | `in-progress`        |

#### Types

###### Stepper Step

Composes the item definition for individual option in the menu

| Property      | Description                               | Type                                   | Default  |
| ------------- | ----------------------------------------- | -------------------------------------- | -------- |
| `label`       | Label that will be rendered with the step | `string`                               | Required |
| `icon`        | Icon to render along with the label       | [`Remix Icon`](https://remixicon.com/) |          |
| `description` | Description for the label                 | `string`                               |          |

```ts
export interface stepper_step {
	label: string;
	icon?: string;
	description?: string;
}
```

###### Stepper Orientation

```ts
export type stepper_orientation = "horizontal" | "vertical";
```

###### Stepper State

```ts
export type stepper_state =
	| "awaiting"
	| "in-progress"
	| "completed"
	| "error"
	| "warning";
```

#### Example

```html
<template>
	<v-eco-stepper :steps="steps" :current="2" />
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		data() {
			return {
				steps: [
					{
						label: "Step 1",
						description: "Install Ecosphere in your project",
					},
					{
						label: "Step 2",
						icon: "ri-home-2-line",
						description: "Configure your main.ts file",
					},
					{
						label: "Step 3",
						description:
							"You're done, components can now be used in your project",
					},
					{
						label: "Step 4",
						description:
							"Review theme customisations to match your need",
					},
				],
			};
		},
	});
</script>
```
