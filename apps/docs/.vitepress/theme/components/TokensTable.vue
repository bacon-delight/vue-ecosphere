<template>
	<table class="ep-ref-table">
		<thead>
			<tr>
				<th>Token</th>
				<th>Value</th>
				<th v-if="hasDescription">Description</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="t in tokens" :key="t.name">
				<td><code>{{ t.name }}</code></td>
				<td>
					<span
						v-if="isColor(t.value)"
						class="ep-token-swatch"
						:style="{ background: t.value }"
					></span>
					<code>{{ t.value }}</code>
				</td>
				<td v-if="hasDescription">{{ t.description || "—" }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import allTokens from "../../../data/tokens.json";

const props = defineProps<{ group: string }>();

const tokens = computed(() => {
	const list = (allTokens as Record<string, any[]>)[props.group] ?? [];
	return list;
});

const hasDescription = computed(() =>
	tokens.value.some((t) => t.description),
);

function isColor(value: string) {
	return /^#|^rgb|^hsl|^oklch/i.test(String(value).trim());
}
</script>
