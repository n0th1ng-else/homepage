<script lang="ts">
	import { onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';

	export let full = false;

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	onDestroy(() => unsubscribeTheme());
</script>

<div class:l="{!isDark}" class:d="{isDark}" class="ui-container" class:full-screen="{full}">
	<slot />
</div>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	@mixin container-style($color, $background-color) {
		@include smooth-change(background-color, color);

		background-color: $background-color;
		color: $color;
	}

	.ui-container {
		@include set-font();
		line-height: 1.5;
		&.full-screen {
			min-height: 100vh;
		}

		&.l {
			@include container-style($l-primary, $l-background);
		}

		&.d {
			@include container-style($d-primary, $d-background);
		}
	}
</style>
