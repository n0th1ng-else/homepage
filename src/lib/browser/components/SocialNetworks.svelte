<script lang="ts">
	import { onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';
	import Link from '$lib/browser/ui/Link.svelte';
	import { getSocialNetworks } from '$lib/browser/utils/contacts';
	import type { ProfileAccounts } from '$lib/common/@types/common';
	import { rssRoute } from '$lib/common/routes';
	import icoRss from '../../../assets/icons/rss.svg';

	export let accounts: ProfileAccounts | null = null;
	const networks = accounts ? getSocialNetworks(accounts) : [];

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	onDestroy(() => unsubscribeTheme());
</script>

<div class="social-networks-wrapper">
	{#each networks as network (network.title)}
		<p class="social-networks-item">
			<Link external url="{network.link}">
				<img
					src="{network.image}"
					alt="{network.title} profile link"
					class="logo no-print"
					class:l="{!isDark}"
					class:d="{isDark}"
				/>
			</Link>
		</p>
	{/each}
	<p class="social-networks-item">
		<Link url="{rssRoute}">
			<img
				src="{icoRss}"
				alt="RSS feed"
				class="logo no-print"
				class:l="{!isDark}"
				class:d="{isDark}"
			/>
		</Link>
	</p>
</div>

<style lang="scss">
	@import '../ui/theme';
	@import '../../../global';

	.social-networks-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.social-networks-item {
		padding: $unit-half;
	}

	.logo {
		@include smooth-change(filter, transform);
		@include image-container($unit-plus);

		&.l {
			@include draw-image-black();
		}

		&.d {
			@include draw-image-white();
		}
	}

	@media (min-width: $sm) {
		.logo {
			@include image-container($unit-double);
		}
	}

	@media (min-width: $md) {
		.logo {
			@include image-container($unit-triple);
		}
	}

	@media print {
		.no-print {
			display: none;
		}
	}
</style>
