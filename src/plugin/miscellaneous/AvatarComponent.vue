<template lang="pug">
img.avatar__image(
	v-if="image",
	:class="[`avatar__image--${size}`, `avatar__image--${hue}`, `avatar__image--${status}`]",
	:src="image",
	:alt="initials"
)
.avatar(
	v-else,
	:class="[`avatar--${size}`, `avatar--${hue}`, `avatar--${status}`]"
)
	.avatar__initials {{ initials }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	avatar_size,
	hue,
	avatar_status,
} from "@/plugin/utilities/types.interface";
import {
	avatar_size_options,
	hue_options,
	avatar_status_options,
} from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "AvatarComponent",
	props: {
		name: {
			type: String as PropType<string>,
			required: true,
		},
		image: {
			type: String as PropType<string>,
			default: "",
		},
		size: {
			type: String as PropType<avatar_size>,
			default: "md",
			validator(value: avatar_size): boolean {
				return avatar_size_options.includes(value);
			},
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
		status: {
			type: String as PropType<avatar_status>,
			default: "default",
			validator(value: avatar_status): boolean {
				return avatar_status_options.includes(value);
			},
		},
	},
	computed: {
		initials(): string {
			return (
				(this.name.match(/(\b\S)?/g) as string[])
					.join("")
					.match(/(^\S|\S$)?/g) as string[]
			)
				.join("")
				.toUpperCase();
		},
	},
});
</script>

<style lang="scss" scoped>
.avatar {
	@include hue-modifiers;
	border-radius: 50%;
	user-select: none;
	box-sizing: border-box;

	// Size
	&--sm {
		padding: 0.5rem;
		@include font-bold;
	}
	&--md {
		padding: 1rem;
		@include font-bold;
	}
	&--lg {
		padding: 1.25rem 1rem;
		@include header-2;
		font-weight: 600;
		margin: 0;
	}

	// Status
	&--busy {
		border: 4px solid $color-error;
	}
	&--offline {
		border: 4px solid $color-offline;
	}
	&--away {
		border: 4px solid $color-warning;
	}
	&--online {
		border: 4px solid $color-success;
	}

	&__image {
		border-radius: 50%;
		@include hue-modifiers;
		@include font-bold;

		// Size
		&--sm {
			height: 2.5rem;
			width: 2.5rem;
			object-fit: cover;
		}
		&--md {
			height: 3.5rem;
			width: 3.5rem;
			object-fit: cover;
		}
		&--lg {
			height: 5rem;
			width: 5rem;
			object-fit: cover;
		}

		// Status
		&--busy {
			border: 4px solid $color-error;
		}
		&--offline {
			border: 4px solid $color-offline;
		}
		&--away {
			border: 4px solid $color-warning;
		}
		&--online {
			border: 4px solid $color-success;
		}
	}
}
</style>
