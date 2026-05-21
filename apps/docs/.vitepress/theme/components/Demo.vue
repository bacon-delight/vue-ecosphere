<template>
	<div class="ep-demo">
		<div class="ep-demo__preview">
			<slot></slot>
		</div>
		<div v-if="$slots.code" class="ep-demo__toolbar">
			<span>{{ title || "Example" }}</span>
			<button type="button" @click="open = !open">
				{{ open ? "Hide code" : "Show code" }}
			</button>
		</div>
		<div v-if="open" class="ep-demo__source">
			<slot name="code"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ title?: string }>();
const open = ref(false);
</script>
