# Radio

Single radio control. For grouped selection, use [RadioGroup](/components/radio-group).

<script setup>
import { ref } from "vue";
const choice = ref("a");
</script>

## Basic usage

<Demo>
	<EpRadio v-model:value="choice" nativeValue="a" label="Option A" name="demo" />
	<EpRadio v-model:value="choice" nativeValue="b" label="Option B" name="demo" />
	<EpRadio v-model:value="choice" nativeValue="c" label="Option C" name="demo" />
</Demo>

## API

### Props
<PropsTable component="EpRadio" />

### Events
<EventsTable component="EpRadio" />

### Slots
<SlotsTable component="EpRadio" />
