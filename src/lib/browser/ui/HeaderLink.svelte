<script lang="ts">
	import { onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';

	export let url = 'javascript:void(0);';
	export let active = false;
	export let label = '';

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	onDestroy(() => unsubscribeTheme());
</script>

<a
	class="ui-header-link"
	class:active
	class:l="{!isDark}"
	class:d="{isDark}"
	href="{url}"
	aria-label="{label}"
>
	<slot />
</a>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	@mixin link-style($primary, $secondary) {
		@include smooth-change(color);

		color: $primary;

		&:hover {
			color: $secondary;
		}

		&.active {
			color: $secondary;
		}
	}

	.ui-header-link {
		@include set-font();
		margin: $unit-half;
		text-decoration: none;
		&.l {
			@include link-style($l-primary, $l-accent);
		}
		&.d {
			@include link-style($d-primary, $d-accent);
		}
	}
</style>
