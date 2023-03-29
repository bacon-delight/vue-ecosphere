#### Use Case

Tags are used to display statuses, selected options, etc; in several use cases.

#### API

| Property     | Description                  | Type                    | Default   |
| ------------ | ---------------------------- | ----------------------- | --------- |
| `label`      | Sets the label of the tag    | `string`                | Required  |
| `size`       | Sets the size of the tag     | [`tag_size`](#tag-size) | `md`      |
| `hue`        | Hue of the tag               | [`hue`](/types#hue)     | `primary` |
| `allowClear` | Allows the tag to be cleared | `boolean`               | `false`   |

#### Types

###### Tag Size

Defines the supported sizes for the tag

```ts
type tag_size = "sm" | "md" | "lg";
```

#### Events

| Event    | Description                                                       | Returns |
| -------- | ----------------------------------------------------------------- | ------- |
| `@clear` | Fired when the tag is cleared, requires `allowClear` to be `true` | `void`  |

#### Example

```js
<template>
	<v-eco-tag label="Tag" />
</template>
```
