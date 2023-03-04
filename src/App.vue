<template lang="pug">
RouterView
</template>

<script lang="ts">
import { defineComponent } from "vue";
import colors from "@/plugin/utilities/defaults/colors";

export default defineComponent({
	mounted() {
		this.$ecosphere.theming.setColors(colors);
	},
});
</script>

<style lang="scss" scoped></style>
