<script lang="ts">
	import { profileStore } from '$lib/browser/stores';
	import Title from '$lib/browser/ui/Title.svelte';
	import SubTitle from '$lib/browser/ui/SubTitle.svelte';
	import TextArea from '$lib/browser/ui/TextArea.svelte';
	import Button from '$lib/browser/ui/Button.svelte';
	import Meta from '$lib/browser/ui/Meta.svelte';
	import { projectsTitle as title } from '$lib/common/labels';
	import { getAuthUrl } from '$lib/common/api';
	import type { ReadingListItemState } from '$lib/common/readingList';
	import type { PageData } from './$types';

	export let data: PageData;

	const { url } = data;

	let articleLink = '';
	let articleComment = '';

	const authoriseAndPublish = async () => {
		if (!articleLink) {
			alert('No link specified');
			return;
		}

		const state: ReadingListItemState = { action: 'READS', url: articleLink, note: articleComment };
		const { url: githubUrl } = await getAuthUrl(encodeURIComponent(JSON.stringify(state)));
		window.open(githubUrl, '_blank');
	};
</script>

<Meta image="{$profileStore?.image ?? ''}" description="My reading list. Add an article" {url} />
<article>
	<Title>Add an article</Title>
	<SubTitle>Add an article in my reading list</SubTitle>
	<div>
		<TextArea bind:text="{articleLink}" placeholder="Enter the link"></TextArea>
	</div>
	<div>
		<TextArea bind:text="{articleComment}" placeholder="Enter the comment"></TextArea>
	</div>
	<div>
		<Button on:click="{authoriseAndPublish}">Save</Button>
	</div>
</article>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<style lang="scss">
</style>
