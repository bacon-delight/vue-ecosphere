<template>
	<div class="wrapper">
		<div class="wrapper__title">Select</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<SelectField
						v-model:value="single"
						label="Fruit"
						:options="options"
						show-search
						allow-clear
					/>
					<SelectField
						v-model:value="multi"
						label="Fruits"
						:options="options"
						multiple
						allow-clear
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SelectField from "@ecosphere/data-entry/SelectField.vue";

export default defineComponent({
	name: "SelectPage",
	components: { SelectField },
	setup() {
		const options = ["Apple", "Banana", "Cherry", "Date"];
		const single = ref<string | null>(null);
		const multi = ref<string[]>([]);
		return { options, single, multi };
	},
});
</script>

<style lang="scss" scoped></style>
