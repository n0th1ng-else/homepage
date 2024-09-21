<script lang="ts">
	import 'highlight.js/scss/github-dark.scss';
	import { beforeUpdate } from 'svelte';
	// import { convertMarkdown } from '$lib/common/api';
	import { keywordsFromString } from '$lib/browser/utils/keywords';

	import TextArea from './TextArea.svelte';

	export let title = '';
	export let keywords = '';
	export let content = '';
	export let logo = '';

	export let preview = false;

	const convertMarkdown = async (text: string): Promise<string> => {
		// TODO implement
		return Promise.resolve(text);
	};

	let tags: string[] = [];
	beforeUpdate(async () => {
		if (preview) {
			tags = keywordsFromString(keywords);
		}
	});
</script>

<div class="editor__container">
	{#if preview}
		<div class="editor__preview">
			<div>
				<h1>{title}</h1>
			</div>
			<p>
				{#each tags as tag}
					<span class="editor__tag">#{tag}</span>
				{/each}
			</p>
			{#if logo}
				<p>
					<img class="editor__logo" src="{logo}" alt="" />
				</p>
			{/if}
			<div>
				{#await convertMarkdown(content)}
					Converting...
				{:then md}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html md}
				{:catch error}
					{error.message}
				{/await}
			</div>
		</div>
	{:else}
		<div class="editor__content">
			<p>
				<TextArea bind:text="{title}" size="xl" placeholder="Create a title..." />
			</p>
			<p>
				<TextArea bind:text="{keywords}" size="md" placeholder="Add a few keywords..." />
			</p>
		</div>
		<p class="editor__content">
			<TextArea bind:text="{content}" size="sm" placeholder="Start the article..." />
		</p>
	{/if}
</div>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	.editor {
		&__container {
			background-color: $cl-grey-lightest;
			border: 1px solid $cl-grey-dark;
			border-radius: $unit-half;
			padding-block: $unit-double;
			padding-inline: $unit-triple;
		}

		&__content {
			padding-block: $unit-double;
			padding-inline: $unit-triple;
		}

		&__preview {
			color: $cl-black;
		}

		&__tag {
			color: $l-secondary;
			margin: $unit-quarter;
		}

		&__logo {
			margin-block-start: $unit-half;
			width: 100%;
			object-fit: fill;
		}
	}
</style>
