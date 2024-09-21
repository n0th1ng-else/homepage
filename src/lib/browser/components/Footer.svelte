<script lang="ts">
	import { accountsStore } from '$lib/browser/stores/accounts';
	import { versionStore } from '$lib/browser/stores/version';
	import { getFirstContentfulPaint } from '$lib/browser/utils/vitals';
	import AdditionalText from '$lib/browser/ui/AdditionalText.svelte';
	import Footer from '$lib/browser/ui/Footer.svelte';
	import Link from '$lib/browser/ui/Link.svelte';
	import Paragraph from '$lib/browser/ui/Paragraph.svelte';
	import { getLinkedInContact } from '$lib/browser/utils/contacts';
	import { getVersion } from '$lib/common/version';
	import { legalRoute } from '$lib/common/routes';
	import { getCurrentYear } from '$lib/common/date';

	import SocialNetworks from './SocialNetworks.svelte';

	export let showFCP: boolean;
	const version = getVersion($versionStore);
	const year = getCurrentYear();
	const profileLink = $accountsStore ? getLinkedInContact($accountsStore).link : '';

	let fcp = '';
	if (showFCP) {
		getFirstContentfulPaint(time => (fcp = time));
	}
</script>

<Footer>
	<div class="network small-screen centered w-space">
		<SocialNetworks accounts="{$accountsStore}" />
	</div>
	<div class="legal w-space">
		<Paragraph centered>
			<AdditionalText>
				My posts reflect my own views and may not be those of my employer
			</AdditionalText>
		</Paragraph>
		<Paragraph centered>
			<AdditionalText>
				Unless otherwise noted, all code is free to use under the
				<Link inline url="{legalRoute}">MIT License</Link>
			</AdditionalText>
		</Paragraph>
	</div>
	<div class="author on-right w-space">
		<Paragraph>
			{#if profileLink}
				<AdditionalText
					>© {year} <Link inline external url="{profileLink}">Sergey Nikitin</Link></AdditionalText
				>
			{:else}
				<AdditionalText>© {year} Sergey Nikitin</AdditionalText>
			{/if}
		</Paragraph>
		<Paragraph>
			<AdditionalText>
				Made with <Link inline external url="https://svelte.dev">Svelte</Link>
				<Link inline external url="https://kit.svelte.dev">Kit</Link> with 🧡
			</AdditionalText>
		</Paragraph>
	</div>
	<div class="network big-screen centered w-space">
		<SocialNetworks accounts="{$accountsStore}" />
	</div>
	<Paragraph centered printVisible="{false}">
		{#if fcp}
			<AdditionalText small>{version} // first contentful paint took {fcp}s.</AdditionalText>
		{:else}
			<AdditionalText small>{version}</AdditionalText>
		{/if}
	</Paragraph>
</Footer>

<style lang="scss">
	@import '../ui/theme';
	@import '../../../global';

	.centered {
		align-self: center;
	}

	.on-right {
		align-self: flex-end;
	}

	.w-space {
		margin-block: $unit;
		margin-inline: $unit-half;
	}

	.legal {
		text-align: center;
	}

	.network.big-screen {
		display: none;
	}

	@media (min-width: $sm) {
		.network.small-screen {
			display: none;
		}

		.network.big-screen {
			display: block;
		}
	}
</style>
