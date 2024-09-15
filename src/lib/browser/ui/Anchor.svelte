<script lang="ts">
	import { onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';
	import icoAnchor from '../../../assets/icons/anchor.svg';

	export let id: string;

	export let show = false;

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	onDestroy(() => unsubscribeTheme());
</script>

<a class="ui-anchor" class:ui-anchor--shown="{show}" href="#{id}">
	<img
		src="{icoAnchor}"
		alt="Link to this section"
		class="ui-anchor__logo"
		class:l="{!isDark}"
		class:d="{isDark}"
	/>
</a>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	.ui-anchor {
		opacity: 0;

		&:focus {
			opacity: 1;
		}

		&--shown {
			opacity: 1;
		}

		&__logo {
			@include smooth-change(filter);
			height: $unit - $unit-eighth;
			object-fit: contain;
			width: $unit - $unit-eighth;

			&.l {
				@include draw-image-black();
			}

			&.d {
				@include draw-image-white();
			}
		}
	}
</style>
