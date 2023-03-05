#### Use Case

A navbar is a strip of options and branding that is usually placed on the top of the application or page.

#### API

| Property   | Description                                               | Type                    | Default |
| ---------- | --------------------------------------------------------- | ----------------------- | ------- |
| `branding` | Branding details to render on the left side of the navbar | [`branding`](#branding) |         |

#### Types

###### Branding

Composes the item definition for individual option in the menu

| Property | Description                            | Type         | Default |
| -------- | -------------------------------------- | ------------ | ------- |
| `label`  | Label to display on the navbar         | `string`     |         |
| `logo`   | Logo (image) path, can be URLs as well | `string`     |         |
| `action` | Action to trigger click of branding    | `() => void` |         |

```ts
interface navbar_branding {
	label?: string;
	logo?: string;
	action?: () => void;
}
```
