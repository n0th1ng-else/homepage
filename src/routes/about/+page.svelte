<script lang="ts">
	import { browser } from '$app/environment';
	import { accountsStore, profileStore } from '$lib/browser/stores';
	import { scrollToBottom } from '$lib/browser/utils/window';
	import Title from '$lib/browser/ui/Title.svelte';
	import SubTitle from '$lib/browser/ui/SubTitle.svelte';
	import Button from '$lib/browser/ui/Button.svelte';
	import List from '$lib/browser/ui/List.svelte';
	import ListItem from '$lib/browser/ui/ListItem.svelte';
	import Link from '$lib/browser/ui/Link.svelte';
	import Meta from '$lib/browser/ui/Meta.svelte';
	import Paragraph from '$lib/browser/ui/Paragraph.svelte';
	import EmailElement from '$lib/browser/components/EmailElement.svelte';
	import { aboutTitle as title } from '$lib/common/labels';
	import { getGitHubContact, getXContact } from '$lib/browser/utils/contacts';
	import type { PageData } from './$types';

	export let data: PageData;

	const { url } = data;

	const photo = $profileStore?.image ?? '';
	const github = $accountsStore ? getGitHubContact($accountsStore) : null;
	const twitter = $accountsStore ? getXContact($accountsStore) : null;

	const scroll = (): void => {
		if (!browser) {
			return;
		}
		scrollToBottom();
	};
</script>

<Meta
	image="{photo}"
	description="Hey there, it's Sergey. I'm a software engineer from Amsterdam, the Netherlands. I explore and learn everything related to Frontend, NodeJS, and Web overall. Check my blog out."
	{url}
/>
<article>
	<Title>About Sergey</Title>
	{#if photo}
		<p class="photo-container">
			<img class="photo" src="{photo}" alt="" />
		</p>
	{/if}
	<div class="section">
		<Paragraph flat>
			Hey there, it's Sergey. I'm a software engineer from Amsterdam, the Netherlands. Originally
			came from Russia, I explore and learn everything related to the Frontend, NodeJS. These days I
			develop UI with React and write some automation tools that keep the company ecosystem
			consistently in shape. Previously, I was doing the same with Angular. If you want to know what
			was before, then it started from Perl and JQuery.
		</Paragraph>
	</div>
	<div class="section">
		<Paragraph flat>
			In my blog, you can find some explorations and interesting cases. I mostly talk about React,
			Angular, and NodeJS. Well, sometimes it's about soft skills. Sometimes it's pretty random
			things.
		</Paragraph>
	</div>

	<SubTitle id="connect">Connect</SubTitle>
	<div class="section">
		<Paragraph flat>
			You can contact me by email at <EmailElement /> to say hi! I always appreciate meeting new people.
			You can find all the links in the footer of each page
			<Button inline on:click="{scroll}" hint="scroll to the bottom">⬇️</Button>. Follow me and send
			me a wave 👋🏿. These are also two main networks I'm in:
		</Paragraph>
	</div>
	<List>
		<ListItem>
			<Link external inline url="{github?.link}">GitHub</Link>
		</ListItem>
		<ListItem>
			<Link external inline url="{twitter?.link}">Twitter</Link>
		</ListItem>
	</List>
</article>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<style lang="scss">
	@import '../../lib/browser/ui/theme';
	@import '../../global';

	.photo-container {
		text-align: center;
		width: auto;
		margin: auto;
		height: $max-photo-size-s;

		@media (min-width: $sm) {
			height: $max-photo-size-m;
		}

		@media (min-width: $md) {
			height: $max-photo-size-l;
		}
	}

	.photo {
		border-radius: $unit;
		height: 100%;
		object-fit: contain;
	}

	.section {
		margin-block: $unit;
		margin-inline: 0;
	}
</style>
