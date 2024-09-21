<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import type { TextAreaSize } from '$lib/browser/ui/types';

	export let text = '';
	export let placeholder = '';
	export let size: TextAreaSize = 'md';

	let ref: HTMLTextAreaElement;

	const detectElementHeight = () => {
		if (!ref) {
			return;
		}
		ref.style.height = 'auto';
		ref.style.height = `${ref.scrollHeight}px`;
	};
	const onChange = () => detectElementHeight();

	onMount(() => detectElementHeight());
	afterUpdate(() => detectElementHeight());
</script>

<textarea
	{placeholder}
	class="ui-textarea ui-textarea--{size}"
	bind:value="{text}"
	bind:this="{ref}"
	on:input="{onChange}"
></textarea>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	.ui-textarea {
		@include set-font();
		background-color: $cl-grey-lightest;
		border: 0;
		padding: 0;
		resize: none;
		width: 100%;

		&:focus {
			outline: none;
		}

		&--xl {
			font-size: $font-size-huge;
			font-weight: $font-weight-bold;
		}

		&--lg {
			font-size: $font-size-bigger;
		}

		&--md {
			font-size: $font-size-big;
		}

		&--sm {
			font-size: $font-size-plus;
		}
	}
</style>
