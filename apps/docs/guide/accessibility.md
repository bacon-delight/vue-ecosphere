# Accessibility

Vue Ecosphere treats accessibility as a non-negotiable acceptance criterion. Every component ships with:

- **Semantic ARIA roles** (`role="tablist"`, `role="radiogroup"`, `aria-pressed`, `aria-selected`, etc.).
- **Keyboard interaction** matching [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).
- **Focus management** with visible focus rings driven by `--ep-focus-ring` tokens.
- **Reduced motion** — animations check `prefers-reduced-motion` and degrade to instant transitions.
- **axe-core tests** in CI for every interactive component.

## What we test

Each component's test file includes a baseline a11y suite:

```ts
import { mount } from "@vue/test-utils";
import axe from "axe-core";

it("has no axe violations", async () => {
	const wrapper = mount(MyComponent, { attachTo: document.body });
	const results = await axe.run(wrapper.element);
	expect(results.violations).toEqual([]);
});
```

189 tests pass across the library as of v0.1.x.

## Keyboard interactions at a glance

| Component | Keys |
| --- | --- |
| `EpButton` | `Enter`, `Space` |
| `EpCheckbox` / `EpSwitch` | `Space` |
| `EpRadioGroup` | `Arrow` keys move selection, `Tab` exits |
| `EpSelect` | `Enter` / `Space` open, `Arrow` navigates, `Escape` closes |
| `EpTabNavigation` | `Arrow` keys, `Home` / `End`, automatic activation toggle |
| `EpMenu` | `Arrow` keys, `Enter` activates, `Escape` closes |
| `EpStepper` | `Arrow` keys move between steps (when interactive) |

## Forms and labels

Every data-entry component takes a **`label`** prop that renders a real `<label>` bound by `for`/`id`. Pass `aria-describedby` via the `hint` or `error` props — they're wired automatically.

```vue
<EpInput
	v-model:value="email"
	label="Email"
	hint="We'll never share this."
	type="email"
	required
/>
```

## Focus rings

Focus rings use `outline` (not `border`) so they survive container clipping. To customize:

```css
:root {
	--ep-focus-ring-color: #ff6b35;
	--ep-focus-ring-width: 3px;
	--ep-focus-ring-offset: 2px;
}
```

## Reporting issues

If you find an accessibility regression, please open an issue with the component name and a minimal reproduction. We treat a11y bugs as P0.
