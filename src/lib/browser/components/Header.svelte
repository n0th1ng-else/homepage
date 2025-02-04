<script lang="ts">
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { homeRoute, blogRoute } from '$lib/common/routes';
	import { onThemeChange, toggleTheme, isDarkTheme } from '$lib/browser/stores/theme';
	import { showBackStore } from '$lib/browser/stores/navigation';
	import { DEFAULT_THEME, persistTheme } from '$lib/common/theme';
	import Button from '$lib/browser/ui/Button.svelte';
	import HeaderLink from '$lib/browser/ui/HeaderLink.svelte';
	import Paragraph from '$lib/browser/ui/Paragraph.svelte';
	import HeaderNavigation from '$lib/browser/components/HeaderNavigation.svelte';
	import type { Theme } from '$lib/common/theme';

	import Arrow from './Arrow.svelte';
	import icoSun from '../../../assets/icons/sun.svg';
	import icoMoon from '../../../assets/icons/moon.svg';

	const toggleThemeIcon = (th: Theme): string => (isDarkTheme(th) ? icoSun : icoMoon);

	let theme = DEFAULT_THEME;
	let icon = toggleThemeIcon(theme);
	let showBack = false;

	const unsubscribeTheme = onThemeChange(th => {
		theme = th;
		persistTheme(th);
		icon = toggleThemeIcon(theme);
	});

	const unsubscribeShowBack = showBackStore.subscribe(sh => (showBack = sh));

	const switchTheme = () => {
		toggleTheme(theme);
		icon = toggleThemeIcon(theme);
	};

	const onBack = () => goto(blogRoute);

	export let activePath = '';

	onDestroy(() => {
		unsubscribeTheme();
		unsubscribeShowBack();
	});
</script>

<header class="header-wrapper">
	<nav class="header">
		<div class="navigation-wrapper">
			<div class="back-button" class:open="{showBack}">
				<Paragraph flat>
					<Arrow type="left" size="md" on:click="{onBack}" hint="Go back to the articles list" />
				</Paragraph>
			</div>
			<p class="logo-container">
				<HeaderLink
					url="{homeRoute}"
					active="{homeRoute === activePath}"
					label="Go to the home page"
				>
					<span class="brand">Nothing Else.</span>
				</HeaderLink>
			</p>
			<div class="navigation-inline">
				<HeaderNavigation {activePath} />
			</div>
			<p class="theme">
				<Button
					secondary
					on:click="{switchTheme}"
					printVisible="{false}"
					{icon}
					hint="change theme"
				/>
			</p>
		</div>
		<div class="navigation">
			<HeaderNavigation {activePath} />
		</div>
	</nav>
</header>

<style lang="scss">
	@import '../ui/theme';
	@import '../../../global';

	@keyframes slideInAccordion {
		0% {
			opacity: 0;
			max-width: 0;
			display: none;
		}

		1% {
			opacity: 0;
			max-width: 0;
			display: inline-block;
		}

		99% {
			opacity: 1;
			max-width: $unit-triple;
			display: inline-block;
		}

		100% {
			opacity: 1;
			max-width: $unit-triple;
			display: inline-block;
		}
	}

	@keyframes slideOutAccordion {
		0% {
			opacity: 1;
			max-width: $unit-triple;
			display: inline-block;
		}

		1% {
			opacity: 1;
			max-width: $unit-triple;
			display: inline-block;
		}

		99% {
			opacity: 0;
			max-width: 0;
			display: inline-block;
		}

		100% {
			opacity: 0;
			max-width: 0;
			display: none;
		}
	}

	.back-button {
		animation-name: slideOutAccordion;
		animation-duration: $transition-fast;

		opacity: 0;
		max-width: 0;
		display: none;

		&.open {
			animation-name: slideInAccordion;
			animation-duration: $transition-fast;

			opacity: 1;
			max-width: $unit-triple;
			display: inline-block;
		}
	}

	.header {
		padding-block-end: $unit-triple;
		padding-inline: $unit;
	}

	.navigation-wrapper {
		align-items: center;
		flex: 0 1 $max-content-width;
		display: flex;
	}

	.logo-container {
		flex: 1 0 auto;
	}

	.brand {
		font-weight: $font-weight-bold;
		font-size: $font-size-big;
	}

	.navigation-inline {
		display: none;
	}

	@media (min-width: $md) {
		.brand {
			font-size: $font-size-big;
		}

		.navigation {
			display: none;
		}

		.navigation-inline {
			display: block;
		}

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
