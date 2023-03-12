#### Use Case

Avatar can be used to render a display picture of initial for users.

#### API

| Property | Description                            | Type                              | Default       |
| -------- | -------------------------------------- | --------------------------------- | ------------- |
| `name`   | Name of the user                       | `string`                          | Required      |
| `image`  | URL for the image                      | [`tag_size`](#tag-size)           | `md`          |
| `size`   | Sets the size of the avatar            | [`avatar_size`](#avatar-size)     | `md`          |
| `hue`    | Hue of the avatar, if no image is used | [`hue`](/types#hue)               | `information` |
| `status` | Sets the status of the avatar          | [`avatar_status`](#avatar-status) | `default`     |

#### Types

###### Avatar Size

Defines the supported sizes for the avatar

```ts
type avatar_size = "sm" | "md" | "lg";
```

###### Avatar Status

Defines the supported status for the avatar

```ts
type avatar_status = "default" | "offline" | "online" | "away" | "busy";
```

#### Example

```js
<template>
	<v-eco-avatar name="Kevin Bacon", status="online" />
</template>
```
