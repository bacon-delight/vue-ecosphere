<script setup lang="ts">
import { ref } from "vue";
import ColorPicker from "./ColorPicker.vue";

const c = ref<string | null>("#3366ff");
</script>
<template>
	<Story title="Data entry/ColorPicker">
		<Variant title="Default">
			<ColorPicker v-model:value="c" label="Brand color" />
		</Variant>
		<Variant title="With alpha">
			<ColorPicker v-model:value="c" label="Background" alpha />
		</Variant>
		<Variant title="Presets">
			<ColorPicker
				v-model:value="c"
				label="Theme"
				:presets="[
					'#ff5e57',
					'#ffa600',
					'#52c41a',
					'#1890ff',
					'#722ed1',
					'#000000',
				]"
			/>
		</Variant>
		<Variant title="Clearable">
			<ColorPicker v-model:value="c" label="Accent" allow-clear />
		</Variant>
	</Story>
</template>
