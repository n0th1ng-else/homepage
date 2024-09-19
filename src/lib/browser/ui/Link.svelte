<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { onThemeChange, isDarkTheme } from '$lib/browser/stores/theme';

	export let external = false;

	export let inline = false;

	export let url = 'javascript:void(0);';

	export let hint: string | undefined = undefined;

	export let raw = false;

	export let printVisible = true;

	const dispatch = createEventDispatcher();

	const onClick = (): void => {
		dispatch('click');
	};

	let isDark = true;

	const unsubscribeTheme = onThemeChange(th => (isDark = isDarkTheme(th)));

	onDestroy(() => unsubscribeTheme());
</script>

{#if external}
	<a
		class="ui-link"
		class:filled="{!raw}"
		class:inline
		class:l="{!isDark}"
		class:d="{isDark}"
		on:click="{onClick}"
		href="{url}"
		title="{hint}"
		target="_blank"
		rel="noreferrer noopener"
	>
		<slot />
	</a>
{:else}
	<a
		class="ui-link"
		class:filled="{!raw}"
		class:l="{!isDark}"
		class:d="{isDark}"
		class:inline
		class:no-print="{!printVisible}"
		on:click="{onClick}"
		href="{url}"
		title="{hint}"
	>
		<slot />
	</a>
{/if}

<style lang="scss">
	@import './theme';
	@import '../../../global';

	.ui-link {
		@include set-font();
		margin: $unit-half;
		text-decoration: none;

		&.inline {
			margin: 0;
		}
		@media print {
			&.no-print {
				display: none;
			}
		}
	}

	.filled {
		&.l {
			@include link-style($l-tertiary, $l-accent);
		}

		&.d {
			@include link-style($d-tertiary, $d-accent);
		}
	}
</style>
