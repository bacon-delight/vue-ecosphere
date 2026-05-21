<template>
	<table v-if="entry && entry.slots.length" class="ep-ref-table">
		<thead>
			<tr>
				<th>Slot</th>
				<th>Scope</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="slot in entry.slots" :key="slot.name">
				<td><code>{{ slot.name }}</code></td>
				<td>
					<code v-if="slot.scope">{{ slot.scope }}</code>
					<span v-else>—</span>
				</td>
				<td>{{ slot.description || "—" }}</td>
			</tr>
		</tbody>
	</table>
	<p v-else><em>This component has no named slots.</em></p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import meta from "../../../data/component-meta.json";

const props = defineProps<{ component: string }>();
const entry = computed(() =>
	(meta as Record<string, any>)[props.component],
);
</script>
