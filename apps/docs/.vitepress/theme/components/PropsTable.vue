<template>
	<div v-if="!entry" class="ep-ref-empty">
		<em>No prop metadata available for <code>{{ component }}</code>.</em>
	</div>
	<table v-else class="ep-ref-table">
		<thead>
			<tr>
				<th>Name</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="prop in entry.props" :key="prop.name">
				<td>
					<code>{{ prop.name }}</code>
					<span v-if="prop.required" title="required">*</span>
				</td>
				<td><code>{{ prop.type }}</code></td>
				<td>
					<code v-if="prop.defaultValue !== null">{{ prop.defaultValue }}</code>
					<span v-else>—</span>
				</td>
				<td>{{ prop.description || "—" }}</td>
			</tr>
			<tr v-if="!entry.props.length">
				<td colspan="4"><em>No public props.</em></td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import meta from "../../../data/component-meta.json";

const props = defineProps<{ component: string }>();
const entry = computed(() =>
	(meta as Record<string, any>)[props.component],
);
</script>
