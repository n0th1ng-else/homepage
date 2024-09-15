<script lang="ts">
	import { onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';
	import Anchor from './Anchor.svelte';

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	export let inline = false;
	export let centered = false;

	export let id = '';

	let show = false;

	const showAnchor = () => {
		if (!id) {
			return;
		}

		show = true;
	};

	const hideAnchor = () => (show = false);

	onDestroy(() => unsubscribeTheme());
</script>

<div class="ui-sub__container">
	{#if id}
		<h2
			{id}
			class="ui-sub"
			class:l="{!isDark}"
			class:d="{isDark}"
			class:header="{!inline}"
			class:centered
			on:focus="{showAnchor}"
			on:mouseover="{showAnchor}"
			on:mouseleave="{hideAnchor}"
		>
			<slot />
			<Anchor {id} {show} />
		</h2>
	{:else}
		<h2
			class="ui-sub"
			class:l="{!isDark}"
			class:d="{isDark}"
			class:header="{!inline}"
			class:centered
		>
			<slot />
		</h2>
	{/if}
</div>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	@mixin subtitle-style($color) {
		@include smooth-change(color);

		color: $color;
	}

	.ui-sub {
		@include set-font();
		font-size: $font-size;
		font-weight: $font-weight;
		margin: 0;

		&.header {
			font-size: $font-size-plus;
			margin-block: $unit-plus $unit;
			position: relative;
		}

		&.centered {
			text-align: center;
		}

		&.l {
			@include subtitle-style($l-primary);
		}

		&.d {
			@include subtitle-style($d-primary);
		}
	}
</style>
