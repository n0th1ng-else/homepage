<script lang="ts">
	import { onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	onDestroy(() => unsubscribeTheme());
</script>

<li class="ui-list-item" class:l="{!isDark}" class:d="{isDark}">
	<slot />
</li>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	@mixin list-item($primary, $secondary) {
		&:before {
			@include smooth-change(color);
			color: $primary;
		}

		&:hover {
			&:before {
				color: $secondary;
			}
		}
	}

	.ui-list-item {
		@include set-font();

		padding-block: $unit-quarter;
		padding-inline: 0;

		&:before {
			content: '\2022';
			font-size: $font-size-bigger;
			line-height: 0.5;
			padding-inline-end: $unit-half;
			vertical-align: middle;
		}

		&.l {
			@include list-item($l-tertiary, $l-accent);
		}

		&.d {
			@include list-item($d-tertiary, $d-accent);
		}
	}
</style>
