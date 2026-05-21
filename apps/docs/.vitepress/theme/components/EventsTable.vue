<template>
	<table v-if="entry && entry.events.length" class="ep-ref-table">
		<thead>
			<tr>
				<th>Event</th>
				<th>Payload</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="evt in entry.events" :key="evt.name">
				<td><code>{{ evt.name }}</code></td>
				<td>
					<code v-if="evt.type">{{ evt.type }}</code>
					<span v-else>—</span>
				</td>
				<td>{{ evt.description || "—" }}</td>
			</tr>
		</tbody>
	</table>
	<p v-else><em>This component emits no events.</em></p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import meta from "../../../data/component-meta.json";

const props = defineProps<{ component: string }>();
const entry = computed(() =>
	(meta as Record<string, any>)[props.component],
);
</script>
